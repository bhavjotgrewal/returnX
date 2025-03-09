# This file is specifically for Vercel serverless deployment
# It imports the Flask app from app.py and exposes it for Vercel

import sys
import os
from flask import Flask, request

# Add parent directory to path to allow imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the app from the main app.py file
from app import app as flask_app

# Create a new Flask app specifically for Vercel that wraps the original app
app = Flask(__name__)

# Middleware to normalize URLs with double slashes
@app.before_request
def normalize_url():
    path = request.path
    # Check if there are consecutive slashes (except for the scheme://)
    if '//' in path and not path.startswith('//'):
        # Normalize multiple slashes to a single slash
        while '//' in path:
            path = path.replace('//', '/')
        # Redirect to the normalized URL
        return flask_app.redirect(path)

# Catch-all route that forwards to the main Flask app
@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
def catch_all(path):
    # Add CORS headers to all responses
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
        }
        return '', 204, headers
    
    # Forward the request to the main app
    return flask_app.dispatch_request()