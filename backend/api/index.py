# api/index.py
from flask import Flask, jsonify, Request
import os
import sys

# Add both the backend directory and the project root to the Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_dir)
sys.path.insert(0, backend_dir)

# Import the app from backend/app.py
from app import app as flask_app

# Create handler function for Vercel
def handler(request):
    """Handle requests in Vercel serverless environment"""
    try:
        # Process the request with Flask app
        return flask_app(request)
    except Exception as e:
        return jsonify({"error": str(e), "message": "Server error occurred"}), 500

# Add test endpoint for debugging
@flask_app.route('/debug')
def debug():
    """Debug endpoint to check if the API is working"""
    return jsonify({
        "status": "ok", 
        "message": "Debug endpoint is working!",
        "path": os.path.abspath(__file__),
        "directory": os.listdir(current_dir)
    })