from flask import Blueprint, jsonify, request
import json
import os
import random
import time
import uuid

# Initialize blueprint
returns_analysis_bp = Blueprint('returns_analysis', __name__)

# Files to store data
RETURNS_FILE = 'data/returns.json'
PRODUCTS_FILE = 'data/product_descriptions.json'

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

# Get all returns for a product
def get_product_returns(product_id):
    if not os.path.exists(RETURNS_FILE):
        return []
    
    try:
        with open(RETURNS_FILE, 'r') as f:
            all_returns = json.load(f)
        
        # Filter returns for the specific product
        product_returns = []
        for return_item in all_returns:
            if 'productInfo' in return_item and str(return_item['productInfo'].get('id', '')) == str(product_id):
                product_returns.append(return_item)
        
        return product_returns
    except Exception as e:
        print(f"Error loading returns: {str(e)}")
        return []

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

# Generate consistent but varied fake return reasons for a product
def generate_fake_returns(product_id, product_details):
    category = product_details.get('category', '')
    
    # Define category-specific return reasons
    category_reasons = {
        'hoodies': [
            "The hoodie was too small for me. I usually wear medium but this feels tight.",
            "The color looks different than what was shown on the website.",
            "The material feels rougher than I expected from the description.",
            "The hood is smaller than I thought it would be.",
            "Sleeves are too short for my arms."
        ],
        'trousers': [
            "These run at least one size smaller than advertised.",
            "The length is shorter than expected for a regular fit.",
            "The fabric is thinner than I thought it would be from the description.",
            "The waistband doesn't have as much stretch as I expected.",
            "The color is darker than it appeared in the product photos."
        ],
        't-shirts': [
            "The t-shirt shrunk significantly after first wash.",
            "The neckline is looser than it appeared in the photos.",
            "The fabric is see-through which wasn't mentioned in the description.",
            "The color faded after one wash.",
            "The fit is more boxy than it looked on the model."
        ],
        'jackets': [
            "The jacket isn't as water-resistant as described.",
            "The sizing runs large - I'm swimming in this jacket.",
            "There are fewer pockets than I expected from a jacket in this price range.",
            "The material feels more like a windbreaker than a proper jacket.",
            "The zipper quality feels cheap and gets stuck."
        ],
        'sweaters': [
            "The sweater is much itchier than I expected.",
            "It's not as warm as the description suggested.",
            "The neckline stretches out too easily.",
            "The sweater pills significantly after just one wear.",
            "The sleeves are too short for a standard size."
        ]
    }
    
    # Get reasons for this category or use generic ones
    reasons = category_reasons.get(category, [
        "The size chart was misleading, item doesn't fit as expected.",
        "Product quality doesn't match the description.",
        "The color looks different in person.",
        "Item arrived with a small defect.",
        "Not what I expected based on the product photos."
    ])
    
    # Select 3-5 reasons
    num_returns = random.randint(3, 5)
    selected_reasons = random.sample(reasons, min(num_returns, len(reasons)))
    
    # Create fake return objects
    fake_returns = []
    for i, reason in enumerate(selected_reasons):
        fake_returns.append({
            "id": f"fake-return-{product_id}-{i}",
            "orderId": random.randint(10000, 99999),
            "productInfo": {
                "id": int(product_id),
                "name": product_details.get('name', ''),
                "category": category
            },
            "reason": reason,
            "timestamp": "2023-12-15T10:00:00.000Z",
            "status": "Completed"
        })
    
    return fake_returns

# Generate improvement suggestions
def generate_improvement_suggestions(product_details, return_reasons):
    # Try to use Gemini if available, otherwise use fallback
    if GEMINI_AVAILABLE and configure_gemini():
        try:
            return generate_gemini_suggestions(product_details, return_reasons)
        except Exception as e:
            print(f"Gemini analysis failed, using fallback: {str(e)}")
            return generate_fallback_suggestions(product_details, return_reasons)
    else:
        return generate_fallback_suggestions(product_details, return_reasons)

# Generate suggestions using Gemini
def generate_gemini_suggestions(product_details, return_reasons):
    current_desc = product_details.get('description', '')
    product_name = product_details.get('name', '')
    product_category = product_details.get('category', '')
    
    # Create prompt for Gemini
    prompt = f"""
    As a product description improvement specialist, analyze these customer return reasons for the product '{product_name}' (category: {product_category}):

    CURRENT PRODUCT DESCRIPTION:
    "{current_desc}"

    CUSTOMER RETURN REASONS:
    {json.dumps(return_reasons, indent=2)}

    Based on these return reasons, create exactly three different improved product descriptions to reduce returns.
    Each suggestion should focus on a different aspect:
    1. First suggestion should improve sizing and fit information
    2. Second suggestion should enhance material quality details
    3. Third suggestion should clarify appearance and color expectations

    Format your response as a JSON array with exactly 3 suggestions, each with these fields:
    [
      {{
        "id": 1,
        "title": "Improved Sizing Information",
        "description": "Brief explanation of what this suggestion improves",
        "image": "size", 
        "improvedDescription": "Complete new product description text"
      }},
      {{
        "id": 2,
        "title": "Enhanced Material Details",
        "description": "Brief explanation of what this suggestion improves",
        "image": "quality",
        "improvedDescription": "Complete new product description text"
      }},
      {{
        "id": 3,
        "title": "Clarified Appearance Expectations",
        "description": "Brief explanation of what this suggestion improves",
        "image": "appearance",
        "improvedDescription": "Complete new product description text"
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
    
    # Format to match frontend expectations
    formatted_suggestions = []
    
    for suggestion in suggestions:
        formatted_suggestions.append({
            "id": suggestion.get("id", 0),
            "title": suggestion.get("title", ""),
            "description": suggestion.get("description", ""),
            "image": suggestion.get("image", "size"),
            "improvedDescription": suggestion.get("improvedDescription", current_desc)
        })
    
    return formatted_suggestions

# Generate fallback suggestions
def generate_fallback_suggestions(product_details, return_reasons):
    current_desc = product_details.get('description', '')
    product_name = product_details.get('name', '')
    category = product_details.get('category', '')
    
    # Extract common issues from return reasons
    size_issues = any('size' in reason.lower() or 'fit' in reason.lower() or 'small' in reason.lower() or 'large' in reason.lower() for reason in return_reasons)
    quality_issues = any('quality' in reason.lower() or 'material' in reason.lower() or 'fabric' in reason.lower() for reason in return_reasons)
    appearance_issues = any('color' in reason.lower() or 'look' in reason.lower() or 'photo' in reason.lower() or 'different' in reason.lower() for reason in return_reasons)
    
    # If no specific issues found, assume all three for demo purposes
    if not any([size_issues, quality_issues, appearance_issues]):
        size_issues = quality_issues = appearance_issues = True
    
    suggestions = []
    
    # Suggestion 1: Focus on size/fit
    size_additions = [
        f"\n\nFit Guide: The {product_name} has a {random.choice(['regular', 'relaxed', 'slim'])} fit. We recommend sizing {random.choice(['up', 'down'])} if you prefer a {random.choice(['looser', 'tighter'])} fit.",
        f"\n\nSizing Note: This {category} runs {random.choice(['true to size', 'slightly small', 'slightly large'])}. Please check our detailed size chart for exact measurements.",
        f"\n\nFit Information: This {category} is designed for a {random.choice(['comfortable', 'tailored', 'relaxed'])} fit. The model is wearing size {random.choice(['S', 'M', 'L'])}."
    ]
    suggestion1 = current_desc + random.choice(size_additions)
    suggestions.append({
        "id": 1,
        "title": "Improved Sizing Information",
        "description": "Adds clear sizing guidance to help customers select the right size, addressing fit-related return reasons.",
        "image": "size",
        "improvedDescription": suggestion1
    })
    
    # Suggestion 2: Focus on material quality
    quality_additions = [
        f"\n\nMaterial Details: Our {product_name} is crafted from premium materials for exceptional durability. The fabric has a {random.choice(['soft', 'structured', 'substantial'])} feel with {random.choice(['slight stretch', 'breathable properties', 'temperature-regulating properties'])}.",
        f"\n\nQuality Assurance: Each {product_name} undergoes rigorous quality testing. The {random.choice(['stitching', 'fabric', 'construction'])} is designed to maintain its {random.choice(['shape', 'color', 'integrity'])} through repeated washing and wearing.",
        f"\n\nMaterial Expectations: The fabric has a {random.choice(['medium weight', 'lightweight', 'heavyweight'])} feel with a {random.choice(['soft', 'textured', 'smooth'])} touch against the skin."
    ]
    suggestion2 = current_desc + random.choice(quality_additions)
    suggestions.append({
        "id": 2,
        "title": "Enhanced Material Details",
        "description": "Provides more specific information about material quality and feel, addressing quality-related return reasons.",
        "image": "quality",
        "improvedDescription": suggestion2
    })
    
    # Suggestion 3: Focus on appearance/color
    appearance_additions = [
        f"\n\nColor Note: The {product_details.get('colors', [''])[0] if product_details.get('colors') else ''} color is a {random.choice(['rich', 'subtle', 'deep'])} tone that may appear slightly {random.choice(['darker', 'lighter', 'more vibrant'])} in person than on screen, depending on your display settings.",
        f"\n\nAppearance Details: Please note that colors may vary slightly from the images shown. The actual {category} has a {random.choice(['matte', 'slight sheen', 'textured'])} finish.",
        f"\n\nVisual Guide: The photos show the exact product you'll receive, though natural variations in {random.choice(['lighting', 'screen settings', 'production'])} may cause slight differences in how colors appear."
    ]
    suggestion3 = current_desc + random.choice(appearance_additions)
    suggestions.append({
        "id": 3,
        "title": "Clarified Appearance Expectations",
        "description": "Sets proper expectations regarding the product's appearance and potential color variations, addressing appearance-related return reasons.",
        "image": "appearance",
        "improvedDescription": suggestion3
    })
    
    return suggestions

# Dashboard data endpoint for the frontend
@returns_analysis_bp.route('/dashboardData', methods=['GET'])
def get_dashboard_data():
    # Get a random product ID (or specific one if provided)
    product_id = request.args.get('productId', str(random.randint(1, 8)))
    
    try:
        # Get product details
        product_details = get_product_details(product_id)
        
        if not product_details:
            return jsonify({"error": "Product not found"}), 404
        
        # Get real or fake return reasons
        returns_data = get_product_returns(product_id)
        if not returns_data:
            # Generate fake returns if no real data
            returns_data = generate_fake_returns(product_id, product_details)
        
        # Extract just the reasons
        return_reasons = [r.get('reason', '') for r in returns_data if 'reason' in r]
        
        # Generate improvement suggestions
        suggestions = generate_improvement_suggestions(product_details, return_reasons)
        
        # Format the response to match frontend expectations
        response_data = {
            "productId": product_id,
            "productName": product_details.get('name', ''),
            "currentDescription": product_details.get('description', ''),
            "returnsCount": len(returns_data),
            "suggestedActions": suggestions
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        print(f"Error generating dashboard data: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Endpoint to apply suggested description update
@returns_analysis_bp.route('/applyAction', methods=['POST'])
def apply_action():
    data = request.json
    
    if not data or 'productId' not in data or 'improvedDescription' not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    product_id = data['productId']
    new_description = data['improvedDescription']
    
    try:
        products_file = 'data/product_descriptions.json'
        
        with open(products_file, 'r') as f:
            products = json.load(f)
        
        if str(product_id) not in products:
            return jsonify({"error": "Product not found"}), 404
        
        # Update the product description
        products[str(product_id)]['description'] = new_description
        
        # Save the updated products
        with open(products_file, 'w') as f:
            json.dump(products, f, indent=2)
        
        return jsonify({
            "success": True,
            "message": "Product description updated successfully",
            "productId": product_id
        })
    
    except Exception as e:
        return jsonify({"error": f"Failed to update product description: {str(e)}"}), 500