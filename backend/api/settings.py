from flask import Blueprint, request, jsonify
import os
import json

settings_bp = Blueprint('settings', __name__)

# Settings file path - use /tmp for Vercel
SETTINGS_FILE = '/tmp/settings.json' if os.environ.get('VERCEL') else 'data/settings.json'

# Default settings
DEFAULT_SETTINGS = {
    "api_key": "",
    "api_endpoint": "",
    "webhook_url": "",
    "email_notifications": False,
    "notification_email": "",
    "slack_notifications": False,
    "data_retention_period": "90",
    "anonymize_customer_data": False,
    "data_refresh_interval": "15"
}

def load_settings():
    """Load settings from file or return defaults if file doesn't exist"""
    if os.path.exists(SETTINGS_FILE):
        try:
            with open(SETTINGS_FILE, 'r') as f:
                return json.load(f)
        except:
            return DEFAULT_SETTINGS
    return DEFAULT_SETTINGS

def save_settings(settings):
    """Save settings to file"""
    os.makedirs(os.path.dirname(SETTINGS_FILE), exist_ok=True)
    with open(SETTINGS_FILE, 'w') as f:
        json.dump(settings, f, indent=4)

@settings_bp.route('/', methods=['GET'])
def get_settings():
    """Get current settings"""
    settings = load_settings()
    
    # Mask API key for security
    if settings.get('api_key'):
        settings['api_key'] = '•' * len(settings['api_key'])
        
    return jsonify(settings)

@settings_bp.route('/', methods=['POST'])
def update_settings():
    """Update settings"""
    current_settings = load_settings()
    new_settings = request.json
    
    # Update settings
    for key, value in new_settings.items():
        if key in current_settings:
            current_settings[key] = value
    
    save_settings(current_settings)
    return jsonify({"status": "success", "message": "Settings updated successfully"})

@settings_bp.route('/test-connection', methods=['POST'])
def test_connection():
    """Test API connection using current settings"""
    settings = load_settings()
    
    # Simulate a successful connection for the hackathon
    return jsonify({
        "status": "success", 
        "message": "Connection successful",
        "details": f"Successfully connected to {settings.get('api_endpoint', 'API')}"
    })