# Add this to your returns_analysis.py file or create it if it doesn't exist

from flask import Blueprint, jsonify, request
import json
import os
import random
from datetime import datetime

# Create a blueprint
returns_analysis_bp = Blueprint('returns_analysis', __name__)

# Get paths based on Vercel environment
RETURNS_FILE = '/tmp/returns.json' if os.environ.get('VERCEL') else 'data/returns.json'
PRODUCTS_FILE = '/tmp/product_descriptions.json' if os.environ.get('VERCEL') else 'data/product_descriptions.json'

# Gemini import - wrapped in try/except to avoid errors if not installed
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    print("Warning: google-generativeai package not installed. Using fallback analysis.")
    GEMINI_AVAILABLE = False

# Configure the Gemini API
def configure_gemini():
    if not GEMINI_AVAILABLE:
        return False
    
    api_key = os.environ.get('GEMINI_API_KEY')
    if not api_key:
        print("Warning: GEMINI_API_KEY not found in environment variables")
        return False
    
    genai.configure(api_key=api_key)
    return True

# Get product details
def get_product_details(product_id):
    if not os.path.exists(PRODUCTS_FILE):
        return None
    
    try:
        with open(PRODUCTS_FILE, 'r') as f:
            products = json.load(f)
        
        return products.get(str(product_id))
    except Exception as e:
        print(f"Error loading product: {str(e)}")
        return None

# Get all returns
def get_all_returns():
    if not os.path.exists(RETURNS_FILE):
        return []
    
    try:
        with open(RETURNS_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading returns: {str(e)}")
        return []

# Get the most recent return or a specific return
def get_return(return_id=None):
    returns = get_all_returns()
    
    if not returns:
        return None
    
    if return_id:
        # Find specific return
        for r in returns:
            if r['id'] == return_id:
                return r
        return None
    else:
        # Get most recent return
        # Sort by timestamp (newest first)
        sorted_returns = sorted(returns, key=lambda x: x.get('timestamp', ''), reverse=True)
        return sorted_returns[0] if sorted_returns else None

# Generate suggestions using Gemini
def generate_gemini_suggestions(product_details, return_data):
    if not GEMINI_AVAILABLE or not configure_gemini():
        print("Using fallback analysis (Gemini not available)")
        return generate_fallback_suggestions(product_details, return_data)
    
    try:
        current_desc = product_details.get('description', '')
        product_name = product_details.get('name', '')
        category = product_details.get('category', '')
        
        # Extract return reason
        return_reason = return_data.get('reason', 'Unknown reason')
        defect_type = return_data.get('analysis', {}).get('defectType', 'Unknown defect')
        
        # Create prompt for Gemini
        prompt = f"""
        I need to improve a product description to prevent returns. Here are the details:

        Product: {product_name} (Category: {category})
        Current description: "{current_desc}"
        
        Recent return information:
        - Customer's reason for return: "{return_reason}"
        - Identified defect/issue: "{defect_type}"
        
        Based on this return data, please provide three different suggestions for improving the product description:
        1. First suggestion should focus on sizing and fit information
        2. Second suggestion should enhance material quality details
        3. Third suggestion should clarify appearance and color expectations
        
        For each suggestion, provide:
        - A title for the suggestion
        - A brief explanation of how this will reduce returns
        - The complete improved description text (entire description, not just the additions)
        
        Format your response as a JSON array with exactly 3 suggestions:
        [
          {{
            "id": 1,
            "title": "Improve Sizing Information",
            "description": "Brief explanation of what this improves",
            "suggestedDescription": "Full improved description text"
          }},
          {{
            "id": 2,
            "title": "Enhance Material Details",
            "description": "Brief explanation of what this improves",
            "suggestedDescription": "Full improved description text"
          }},
          {{
            "id": 3,
            "title": "Clarify Appearance Expectations",
            "description": "Brief explanation of what this improves",
            "suggestedDescription": "Full improved description text"
          }}
        ]
        
        Only return the JSON array, no additional text.
        """
        
        # Initialize Gemini model
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Generate content with Gemini
        response = model.generate_content(prompt)
        
        # Parse the JSON response
        response_text = response.text
        
        # Handle Gemini responses that might have markdown code blocks
        if "```json" in response_text:
            json_part = response_text.split("```json")[1].split("```")[0].strip()
            suggestions = json.loads(json_part)
        else:
            # Try to directly parse as JSON
            suggestions = json.loads(response_text)
        
        return suggestions
    
    except Exception as e:
        print(f"Error generating suggestions with Gemini: {str(e)}")
        return generate_fallback_suggestions(product_details, return_data)

# Generate fallback suggestions
def generate_fallback_suggestions(product_details, return_data):
    current_desc = product_details.get('description', '')
    product_name = product_details.get('name', '')
    category = product_details.get('category', '')
    
    # Extract return reason
    return_reason = return_data.get('reason', 'Unknown reason').lower()
    
    # Identify common issues from return reason
    size_issues = any(word in return_reason for word in ['size', 'fit', 'small', 'large', 'tight', 'loose'])
    quality_issues = any(word in return_reason for word in ['quality', 'material', 'fabric', 'tear', 'rip', 'broke'])
    appearance_issues = any(word in return_reason for word in ['color', 'colour', 'look', 'different', 'photo', 'picture'])
    
    # Default to all issues if none detected
    if not any([size_issues, quality_issues, appearance_issues]):
        size_issues = quality_issues = appearance_issues = True
    
    suggestions = []
    
    # Suggestion 1: Size/Fit
    size_addition = f"Please note: {product_name} has a regular fit. We recommend sizing up if you prefer a looser fit, or sizing down for a more snug feel. Please refer to our size chart for exact measurements."
    suggestions.append({
        "id": 1,
        "title": "Improve Sizing Information",
        "description": "Adding detailed sizing guidance will help customers select the right size and reduce fit-related returns.",
        "suggestedDescription": f"{current_desc}\n\n{size_addition}"
    })
    
    # Suggestion 2: Material Quality
    quality_addition = f"This {category} is crafted from premium materials for exceptional durability and comfort. The fabric has a substantial feel with slight stretch for ease of movement and is designed to maintain its shape through repeated washing and wearing."
    suggestions.append({
        "id": 2,
        "title": "Enhance Material Details",
        "description": "Providing more information about material quality and feel addresses quality-related return concerns.",
        "suggestedDescription": f"{current_desc}\n\n{quality_addition}"
    })
    
    # Suggestion 3: Appearance/Color
    color = product_details.get('colors', ['blue'])[0] if hasattr(product_details, 'get') and product_details.get('colors') else 'the product'
    appearance_addition = f"Please note that colors may appear slightly different on different screens. {color.capitalize()} color has a slightly matte finish and may appear darker/lighter in person than in the product images."
    suggestions.append({
        "id": 3,
        "title": "Clarify Appearance Expectations",
        "description": "Setting proper expectations regarding color and appearance reduces returns related to visual differences.",
        "suggestedDescription": f"{current_desc}\n\n{appearance_addition}"
    })
    
    return suggestions

@returns_analysis_bp.route('/dashboardData', methods=['GET'])
def get_dashboard_data():
    # Get query parameters
    return_id = request.args.get('returnId')
    product_id = request.args.get('productId')
    
    try:
        # Get return data - either specific or most recent
        return_data = get_return(return_id)
        
        # If no return ID was provided, use the most recent return
        if not return_data:
            all_returns = get_all_returns()
            if all_returns:
                # Sort returns by timestamp (newest first)
                sorted_returns = sorted(all_returns, key=lambda x: x.get('timestamp', ''), reverse=True)
                return_data = sorted_returns[0]
                print(f"Using most recent return: {return_data.get('id')}")
        
        # Determine the product ID
        if not product_id and return_data:
            # Try to get product ID from return data
            # Look for an 'id' field in productInfo
            product_id_from_return = return_data.get('productInfo', {}).get('id')
            
            # If no explicit ID, try to determine based on product name
            if not product_id_from_return:
                product_name = return_data.get('productInfo', {}).get('name')
                if product_name:
                    # Default to product ID 1 for this hackathon if we have a product name
                    product_id = "1"
                    print(f"No explicit product ID found, using default ID 1 for product: {product_name}")
            else:
                product_id = str(product_id_from_return)
        
        # If we still don't have a product ID, default to "1" for the hackathon
        if not product_id:
            product_id = "1"
            print("No product ID found in return data, using default ID 1")
            
        # Get product details
        product_details = get_product_details(product_id)
        
        if not product_details:
            # For hackathon, if we can't find the product, use a hardcoded response
            product_details = {
                "id": 1,
                "name": "Product",
                "description": "Product description",
                "category": "category"
            }
            print(f"Product with ID {product_id} not found, using default product details")
        
        # Generate suggestions based on the return data if available
        if return_data:
            suggestions = generate_gemini_suggestions(product_details, return_data)
            return_reason = return_data.get('reason', '')
        else:
            # Fallback if no return data
            suggestions = generate_fallback_suggestions(product_details, {})
            return_reason = "Based on product analysis"
        
        # Prepare response
        response = {
            "productId": product_id,
            "productName": product_details.get('name', ''),
            "currentDescription": product_details.get('description', ''),
            "returnsCount": 1 if return_data else 0,
            "returnReason": return_reason,
            "analysis": {
                "suggestionType": "multiple",
                "suggestions": suggestions
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        print(f"Error generating dashboard data: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Endpoint to apply a suggested description update
@returns_analysis_bp.route('/applyAction', methods=['POST'])
def apply_action():
    data = request.json
    
    if not data or 'id' not in data or 'description' not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    product_id = data['id']
    new_description = data['description']
    
    try:
        # Load the products
        if not os.path.exists(PRODUCTS_FILE):
            return jsonify({"error": "Products file not found"}), 404
        
        with open(PRODUCTS_FILE, 'r') as f:
            products = json.load(f)
        
        if str(product_id) not in products:
            return jsonify({"error": "Product not found"}), 404
        
        # Update the product description
        products[str(product_id)]['description'] = new_description
        
        # Save the updated products
        with open(PRODUCTS_FILE, 'w') as f:
            json.dump(products, f, indent=2)
        
        return jsonify({
            "success": True,
            "message": "Product description updated successfully",
            "productId": product_id
        })
    
    except Exception as e:
        return jsonify({"error": f"Failed to update product description: {str(e)}"}), 500