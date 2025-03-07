from flask import Flask, jsonify
from flask_cors import CORS
import os

# Import blueprints
from api.settings import settings_bp
from api.performance import performance_bp
from api.promote import promote_bp

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Register blueprints
    app.register_blueprint(settings_bp, url_prefix='/api/settings')
    app.register_blueprint(performance_bp, url_prefix='/api/performance')
    app.register_blueprint(promote_bp, url_prefix='/api/promote')
    
    # Root route
    @app.route("/")
    def home():
        return jsonify({"message": "Hello from Returns-X API!"})
    
    # Health check route
    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok"})
    
    # Create data directory if running locally
    os.makedirs('data', exist_ok=True)
    
    return app

# Create the application instance
app = create_app()

if __name__ == "__main__":
    print("Starting server on http://127.0.0.1:5000")
    print("Available routes:")
    print("  - http://127.0.0.1:5000/")
    print("  - http://127.0.0.1:5000/api/health")
    print("  - http://127.0.0.1:5000/api/settings")
    print("  - http://127.0.0.1:5000/api/performance/data")
    print("  - http://127.0.0.1:5000/api/promote/recommendations")
    app.run(debug=True)