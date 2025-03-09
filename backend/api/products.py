from flask import Blueprint, jsonify, request
import json
import os

# Initialize blueprint
products_bp = Blueprint('products', __name__)

# File to store the descriptions
PRODUCTS_FILE = '/tmp/product_descriptions.json' if os.environ.get('VERCEL') else 'data/product_descriptions.json'

# Initial product data matching provided dataset
def get_initial_products():
    return {
        "1": {
            "id": 1,
            "name": "Sigma Hoodie",
            "price": 100.99,
            "currency": "CAD",
            "image": "/images/products/hoodie-1.jpg",
            "category": "hoodies",
            "colors": ["burgundy", "black", "cream"],
            "sizes": ["XS", "S", "M", "L", "XL"],
            "description": "The Sigma hoodie features a unique abstract design, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.",
            "composition": "95% organic certified cotton, 5% elastane"
        },
        "2": {
            "id": 2,
            "name": "Dorian Trousers",
            "price": 100.99,
            "currency": "CAD",
            "image": "/images/products/trousers-3.jpg",
            "category": "trousers",
            "colors": ["burgundy", "black", "olive"],
            "sizes": ["XS", "S", "M", "L", "XL"],
            "description": "The Dorian Trousers are our best-selling jogger-style trouser, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.\n\nThis style is a wardrobe essential and reliable daywear piece that you'll find yourself reaching for on a daily basis.",
            "composition": "95% organic certified cotton, 5% elastane"
        },
        "3": {
            "id": 3,
            "name": "Cloud Tee",
            "price": 75.99,
            "currency": "CAD",
            "image": "/images/products/t-shirt-1.jpg",
            "category": "t-shirts",
            "colors": ["white", "black", "gray"],
            "sizes": ["XS", "S", "M", "L", "XL"],
            "description": "Our signature Cloud Tee features a minimal design with exceptional comfort. Made from 100% organic cotton, it's the perfect addition to any wardrobe.",
            "composition": "100% organic certified cotton"
        },
        "4": {
            "id": 4,
            "name": "Drift Jacket",
            "price": 199.99,
            "currency": "CAD",
            "image": "/images/products/jacket-1.jpg",
            "category": "jackets",
            "colors": ["navy", "olive", "black"],
            "sizes": ["S", "M", "L", "XL"],
            "description": "The Drift Jacket is your perfect companion for unpredictable weather. Water-resistant, breathable, and stylish, it's as functional as it is fashionable.",
            "composition": "85% recycled polyester, 15% elastane"
        },
        "5": {
            "id": 5,
            "name": "Echo Pants",
            "price": 125.99,
            "currency": "CAD",
            "image": "/images/products/trousers-2.jpg",
            "category": "trousers",
            "colors": ["black", "navy", "beige"],
            "sizes": ["XS", "S", "M", "L", "XL"],
            "description": "The Echo Pants combine comfort with a tailored look for versatile everyday wear. Features a relaxed fit with premium organic cotton blend.",
            "composition": "90% organic certified cotton, 10% elastane"
        },
        "6": {
            "id": 6,
            "name": "Nimbus Sweater",
            "price": 149.99,
            "currency": "CAD",
            "image": "/images/products/sweater-1.jpg",
            "category": "sweaters",
            "colors": ["cream", "charcoal", "navy"],
            "sizes": ["XS", "S", "M", "L", "XL"],
            "description": "The Nimbus Sweater offers exceptional warmth without bulk. Crafted from sustainable wool blend, it's perfect for layering or as a standalone piece.",
            "composition": "70% recycled wool, 30% organic cotton"
        },
        "7": {
            "id": 7,
            "name": "Rotman Hoodie",
            "price": 100.99,
            "currency": "CAD",
            "image": "/images/products/hoodie-2.jpg",
            "category": "hoodies",
            "colors": ["burgundy", "black", "cream"],
            "sizes": ["XS", "S", "M", "L", "XL"],
            "description": "The Rotman hoodie features a unique abstract design, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.",
            "composition": "95% organic certified cotton, 5% elastane"
        },
        "8": {
            "id": 8,
            "name": "Elias Trousers",
            "price": 100.99,
            "currency": "CAD",
            "image": "/images/products/trousers-1.jpg",
            "category": "trousers",
            "colors": ["burgundy", "black", "olive"],
            "sizes": ["XS", "S", "M", "L", "XL"],
            "description": "The Elias Trousers are our best-selling jogger-style trouser, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.\n\nThis style is a wardrobe essential and reliable daywear piece that you'll find yourself reaching for on a daily basis.",
            "composition": "95% organic certified cotton, 5% elastane"
        }
    }

# Make sure the data directory exists
def ensure_data_dir():
    os.makedirs(os.path.dirname(PRODUCTS_FILE), exist_ok=True)

# Initialize data file if it doesn't exist
def init_product_data():
    ensure_data_dir()
    if not os.path.exists(PRODUCTS_FILE):
        products = get_initial_products()
        with open(PRODUCTS_FILE, 'w') as f:
            json.dump(products, f, indent=2)
        return products
    
    # Return existing data
    with open(PRODUCTS_FILE, 'r') as f:
        return json.load(f)

# Get all product descriptions
@products_bp.route('', methods=['GET'])
def get_products():
    descriptions = init_product_data()
    return jsonify([descriptions[pid] for pid in descriptions])

# Get a specific product description
@products_bp.route('/<product_id>', methods=['GET'])
def get_product(product_id):
    descriptions = init_product_data()
    
    if product_id in descriptions:
        return jsonify(descriptions[product_id])
    else:
        return jsonify({"error": "Product not found"}), 404

# Update a product description
@products_bp.route('/<product_id>', methods=['POST'])
def update_product(product_id):
    data = request.json
    descriptions = init_product_data()
    
    if product_id not in descriptions:
        return jsonify({"error": "Product not found"}), 404
    
    # Update the product data
    descriptions[product_id].update(data)
    
    # Save to file
    with open(PRODUCTS_FILE, 'w') as f:
        json.dump(descriptions, f, indent=2)
    
    return jsonify(descriptions[product_id])

# Initialize on import
init_product_data()