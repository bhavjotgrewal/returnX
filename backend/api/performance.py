from flask import Blueprint, jsonify

performance_bp = Blueprint('performance', __name__)

@performance_bp.route('/', methods=['GET'])
def get_performance():
    """Get performance metrics"""
    # Placeholder for actual implementation
    return jsonify({
        "metrics": {
            "retention_rate": 92.5,
            "avg_lifetime_value": 450,
            "return_rate": 5.2,
            "customer_satisfaction": 4.7
        }
    })
