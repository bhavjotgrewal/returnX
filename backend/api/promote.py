from flask import Blueprint, jsonify, request

promote_bp = Blueprint('promote', __name__)

@promote_bp.route('/', methods=['GET'])
def get_promotion_status():
    """Get status of current promotions"""
    # Placeholder for actual implementation
    return jsonify({
        "active_promotions": [
            {
                "id": "promo-123",
                "name": "Spring Sale",
                "discount": "15%",
                "status": "active"
            },
            {
                "id": "promo-456",
                "name": "New Customer",
                "discount": "10%",
                "status": "active"
            }
        ]
    })

@promote_bp.route('/new', methods=['POST'])
def create_promotion():
    """Create a new promotion"""
    # Placeholder for actual implementation
    data = request.json
    return jsonify({
        "success": True,
        "message": "Promotion created successfully",
        "promotion_id": "promo-789"
    })
