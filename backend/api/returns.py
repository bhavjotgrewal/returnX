from flask import Blueprint, jsonify, request, send_file
import json
import os
import base64
import uuid
from datetime import datetime
import io
from PIL import Image

# Initialize blueprint
returns_bp = Blueprint('returns', __name__)

# Gemini import - wrapped in try/except to avoid errors if not installed
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    print("Warning: google-generativeai package not installed. Using fallback analysis.")
    GEMINI_AVAILABLE = False

# File to store the return reasons
RETURNS_FILE = '/tmp/returns.json' if os.environ.get('VERCEL') else 'data/returns.json'

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

# Make sure the data directory exists
def ensure_data_dir():
    """Ensure data directories exist"""
    # Use /tmp in Vercel environment
    base_dir = '/tmp/data' if os.environ.get('VERCEL') else 'data'
    images_dir = f'{base_dir}/return_images'
    
    os.makedirs(base_dir, exist_ok=True)
    os.makedirs(images_dir, exist_ok=True)
    return base_dir, images_dir

# Initialize returns data file if it doesn't exist
def init_returns_data():
    ensure_data_dir()
    if not os.path.exists(RETURNS_FILE):
        with open(RETURNS_FILE, 'w') as f:
            json.dump([], f, indent=2)
        return []
    with open(RETURNS_FILE, 'r') as f:
        return json.load(f)

def save_return_image(image_data):
    try:
        # Get the appropriate directory
        _, images_dir = ensure_data_dir()
        
        # Generate unique filename
        filename = f"return_image_{uuid.uuid4()}.jpg"
        file_path = f"{images_dir}/{filename}"
        
        # Remove data URL prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode and save the image
        with open(file_path, 'wb') as f:
            f.write(base64.b64decode(image_data))
            
        return filename, file_path
    except Exception as e:
        print(f"Error saving image: {str(e)}")
        return None, None

# Analyze return image with Gemini
def analyze_return_image(image_path, product_info, reason):
    # Check if Gemini is available and configured
    if not GEMINI_AVAILABLE or not configure_gemini():
        print("Using fallback analysis (Gemini not available)")
        return fallback_analysis(product_info, reason)
    
    try:
        # Read image file
        with open(image_path, 'rb') as f:
            image_bytes = f.read()
        
        # Convert raw bytes to a PIL Image
        image_pil = Image.open(io.BytesIO(image_bytes))
        
        # Initialize Gemini model
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Create prompt for the model
        prompt = f"""
        Analyze this product return image:
        
        Product: {product_info['name']}
        Category: {product_info['category']}
        Customer return reason: "{reason}"
        
        Please determine:
        1. Is the product identifiable in the image? (Yes/No)
        2. Are there any visible defects? (Yes/No)
        3. What type of defect is visible, if any?
        4. Should this return be approved based on the image? (Yes/No)
        
        Format your response as a JSON object with the following fields:
        {{
          "productIdentified": true/false,
          "defectsFound": true/false,
          "defectType": "description of defect or 'None found'",
          "returnEligible": true/false
        }}
        
        Only return the JSON object, no additional text.
        """
        print(prompt)
        
        # Generate content with Gemini using the prompt and the PIL image
        response = model.generate_content([prompt, image_pil])
        print(response)
        
        # Parse the JSON response
        response_text = response.text
        
        # Handle Gemini responses that might have markdown code blocks
        if "```json" in response_text:
            json_part = response_text.split("```json")[1].split("```")[0].strip()
            analysis_result = json.loads(json_part)
        else:
            # Try to directly parse as JSON
            analysis_result = json.loads(response_text)
            
        return analysis_result
    
    except Exception as e:
        print(f"Error analyzing image with Gemini: {str(e)}")
        return fallback_analysis(product_info, reason)

# Fallback analysis when Gemini is not available
def fallback_analysis(product_info, reason):
    print("Using fallback analysis")
    
    # For hackathon purposes, we'll determine return eligibility based on keywords in the reason
    reason_lower = reason.lower()
    defect_keywords = ["broken", "tear", "rip", "damaged", "defect", "hole", "stain", "wrong", "not as described"]
    
    has_defect = any(keyword in reason_lower for keyword in defect_keywords)
    
    # Generate a relevant defect type based on the reason
    defect_type = "None found"
    if "broken" in reason_lower:
        defect_type = "Broken component"
    elif any(word in reason_lower for word in ["tear", "rip", "hole"]):
        defect_type = "Fabric damage"
    elif "stain" in reason_lower:
        defect_type = "Staining/discoloration"
    elif "wrong" in reason_lower:
        defect_type = "Incorrect item received"
    elif "size" in reason_lower:
        defect_type = "Size issue"
    elif "color" in reason_lower or "colour" in reason_lower:
        defect_type = "Color not as expected"
    elif has_defect:
        defect_type = "General product defect"
    
    return {
        "productIdentified": True,
        "defectsFound": has_defect,
        "defectType": defect_type,
        "returnEligible": True  # For hackathon, always approve returns
    }

# Analyze return image and save return data
@returns_bp.route('/analyze', methods=['POST'])
def analyze_return():
    data = request.json
    
    # Validate required fields
    if not all(key in data for key in ['image', 'orderId', 'productInfo', 'reason']):
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        # Save the image
        image_data = data['image']
        image_filename, image_path = save_return_image(image_data)
        
        if not image_filename:
            return jsonify({"error": "Failed to save image"}), 500
        
        # Analyze the image
        analysis_result = analyze_return_image(
            image_path, 
            data['productInfo'],
            data['reason']
        )
        
        # Generate a unique ID for this return
        return_id = str(uuid.uuid4())
        
        # Save return data for future analysis
        return_entry = {
            "id": return_id,
            "orderId": data['orderId'],
            "productInfo": data['productInfo'],
            "reason": data['reason'],
            "imagePath": image_filename,
            "analysis": analysis_result,
            "timestamp": datetime.now().isoformat(),
            "status": "Pending" if analysis_result.get("returnEligible", False) else "Rejected"
        }
        
        # Get existing returns
        returns = init_returns_data()
        returns.append(return_entry)
        
        # Save updated returns
        with open(RETURNS_FILE, 'w') as f:
            json.dump(returns, f, indent=2)
        
        # Return the analysis result
        return jsonify({
            "result": analysis_result,
            "returnId": return_id
        })
    
    except Exception as e:
        print(f"Error processing return: {str(e)}")
        return jsonify({"error": "Failed to process return request"}), 500

# Get all returns (for admin analysis)
@returns_bp.route('', methods=['GET'])
def get_returns():
    returns = init_returns_data()
    return jsonify(returns)

# Update return status
@returns_bp.route('/<return_id>/status', methods=['POST'])
def update_return_status(return_id):
    data = request.json
    
    if 'status' not in data:
        return jsonify({"error": "Missing status field"}), 400
    
    returns = init_returns_data()
    
    # Find and update the return
    found = False
    for r in returns:
        if r['id'] == return_id:
            r['status'] = data['status']
            found = True
            break
    
    if not found:
        return jsonify({"error": "Return not found"}), 404
    
    # Save updated returns
    with open(RETURNS_FILE, 'w') as f:
        json.dump(returns, f, indent=2)
    
    return jsonify({"message": "Return status updated"})

# Serve return images
@returns_bp.route('/images/<filename>', methods=['GET'])
def get_return_image(filename):
    try:
        # Get the appropriate directory
        _, images_dir = ensure_data_dir()
        file_path = f"{images_dir}/{filename}"
        
        # Check if file exists
        if not os.path.exists(file_path):
            return jsonify({"error": "Image not found"}), 404
        
        # Determine content type
        content_type = 'image/jpeg'
        if filename.endswith('.png'):
            content_type = 'image/png'
        elif filename.endswith('.gif'):
            content_type = 'image/gif'
        
        # Return the file
        return send_file(file_path, mimetype=content_type)
    
    except Exception as e:
        print(f"Error serving image: {str(e)}")
        return jsonify({"error": "Failed to serve image"}), 500

# Initialize on import
init_returns_data()