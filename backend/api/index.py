# api/index.py
from flask import Flask
import sys
import os

# Add the parent directory to path so imports work correctly
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the app directly - Vercel needs this specific handler
from app import app

handler = app