# api/index.py
from flask import Flask, jsonify, Request
import os
import sys

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the app once the path is set up
from app import app as flask_app

# Create handler function for Vercel
def handler(request):
    """Handle requests in Vercel serverless environment"""
    # Process the request with Flask app
    return flask_app(request)

# For local development & testing
if __name__ == "__main__":
    flask_app.run(debug=True)