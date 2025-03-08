# api/index.py
from flask import Flask, jsonify

# Create a handler function specifically for Vercel
def handler(request):
    # Import the Flask app from the root directory
    import sys
    import os
    
    # Add the project root to the Python path
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    
    # Now import the app from the root directory
    from app import app
    
    # Process the request with your Flask app
    with app.request_context(request):
        try:
            response = app.full_dispatch_request()
            return response
        except Exception as e:
            return jsonify({"error": str(e)}), 500