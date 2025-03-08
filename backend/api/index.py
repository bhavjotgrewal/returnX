# This file is specifically for Vercel serverless deployment
# It imports the Flask app from app.py and exposes it for Vercel

import sys
import os

# Add parent directory to path to allow imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the app from the main app.py file
from app import app