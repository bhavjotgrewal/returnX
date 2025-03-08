from flask import Flask, jsonify
from flask_cors import CORS
import os


# Import blueprints
from api.settings import settings_bp
from api.performance import performance_bp
from api.promote import promote_bp
from api.returns import returns_bp
from api.products import products_bp
from api.returns_analysis import returns_analysis_bp

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Register blueprints
    app.register_blueprint(settings_bp, url_prefix='/api/settings')
    app.register_blueprint(performance_bp, url_prefix='/api/performance')
    app.register_blueprint(promote_bp, url_prefix='/api/promote')
    app.register_blueprint(returns_bp, url_prefix='/api/returns')
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(returns_analysis_bp, url_prefix='/api/returns_analysis')
    
    # Root route
    @app.route("/")
    def home():
        return jsonify({"message": "Hello from Returns-X API!"})
    
    # Health check route
    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok"})
    
    # Create data directories if running locally
    os.makedirs('data', exist_ok=True)
    os.makedirs('data/return_images', exist_ok=True)
    
    return app

# Create the application instance
app = create_app()

if __name__ == "__main__":
    # Check for Gemini API key
    if not os.environ.get('GEMINI_API_KEY'):
        print("Warning: GEMINI_API_KEY environment variable not set")
        print("For production, please set this environment variable")
        print("Using fallback analysis for now (hackathon mode)")
    
    print("Starting server on http://127.0.0.1:5000")
    print("Available routes:")
    print("  - http://127.0.0.1:5000/")
    print("  - http://127.0.0.1:5000/api/health")
    print("  - http://127.0.0.1:5000/api/settings")
    print("  - http://127.0.0.1:5000/api/returns/analyze")
    print("  - http://127.0.0.1:5000/api/products")
    print("  - http://127.0.0.1:5000/api/returns_analysis/dashboardData")
    print("  - http://127.0.0.1:5000/api/returns_analysis/applyAction")
    app.run(debug=True)