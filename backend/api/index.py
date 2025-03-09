# Import Flask to create an app instance directly in this file
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import sys

# Add parent directory to path to allow imports from app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import blueprints
try:
    from api.settings import settings_bp
    from api.performance import performance_bp
    from api.promote import promote_bp
    from api.returns import returns_bp
    from api.products import products_bp
    from api.returns_analysis import returns_analysis_bp
except ImportError:
    # Fallback - during deployment the module structure might be different
    from settings import settings_bp
    from performance import performance_bp
    from promote import promote_bp
    from returns import returns_bp
    from products import products_bp
    from returns_analysis import returns_analysis_bp

# Create a Flask app directly in this file
app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Add CORS headers to all responses
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Handle OPTIONS requests explicitly
@app.route('/', defaults={'path': ''}, methods=['OPTIONS'])
@app.route('/<path:path>', methods=['OPTIONS'])
def options_handler(path):
    response = jsonify({'status': 'ok'})
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

# Register blueprints
app.register_blueprint(settings_bp, url_prefix='/settings')
app.register_blueprint(performance_bp, url_prefix='/performance')
app.register_blueprint(promote_bp, url_prefix='/promote')
app.register_blueprint(returns_bp, url_prefix='/returns')
app.register_blueprint(products_bp, url_prefix='/products')
app.register_blueprint(returns_analysis_bp, url_prefix='/returns_analysis')

# Root route
@app.route("/")
def home():
    return jsonify({"message": "Hello from Returns-X API!"})

# Health check route
@app.route("/health")
def health():
    return jsonify({"status": "ok"})

# Create data directories in Vercel environment
if os.environ.get('VERCEL'):
    os.makedirs('/tmp', exist_ok=True)
    os.makedirs('/tmp/return_images', exist_ok=True)