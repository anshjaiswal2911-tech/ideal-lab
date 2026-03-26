from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB Connection
try:
    client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=2000)
    db = client['inclusive_city']
    issues_collection = db['issues']
    # Check connection
    client.server_info()
    print("Connected to MongoDB successfully")
except Exception as e:
    print(f"Could not connect to MongoDB: {e}")
    # Fallback to in-memory for safety during dev if mongo is down
    issues_collection = None

# Initial helper to seed data if empty
def seed_data():
    if issues_collection is not None and issues_collection.count_documents({}) == 0:
        initial_issues = [
            {
                'id': '1',
                'type': 'broken-footpath',
                'severity': 'high',
                'location': {'lat': 40.7128, 'lng': -74.0060, 'address': 'Broadway & Wall St'},
                'description': 'Major cracks in the sidewalk making it impassable for wheelchairs.',
                'status': 'pending',
                'timestamp': datetime.now().isoformat(),
            },
            {
                'id': '2',
                'type': 'no-ramp',
                'severity': 'medium',
                'location': {'lat': 40.7142, 'lng': -74.0059, 'address': 'Chambers St'},
                'description': 'Missing ramp at the intersection.',
                'status': 'resolved',
                'timestamp': datetime.now().isoformat(),
            }
        ]
        issues_collection.insert_many(initial_issues)

@app.route('/api/issues', methods=['GET'])
def get_issues():
    if issues_collection is None:
        return jsonify([]), 503
    
    all_issues = list(issues_collection.find({}, {'_id': 0}))
    return jsonify(all_issues)

@app.route('/api/issues', methods=['POST'])
def add_issue():
    if issues_collection is None:
        return jsonify({'error': 'Database unavailable'}), 503
        
    data = request.json
    new_issue = {
        'id': str(uuid.uuid4()),
        'type': data.get('type'),
        'severity': data.get('severity'),
        'location': data.get('location'),
        'description': data.get('description'),
        'status': 'pending',
        'timestamp': datetime.now().isoformat(),
        'image': data.get('image')
    }
    issues_collection.insert_one(new_issue)
    # Remove _id for frontend compatibility
    if '_id' in new_issue:
        del new_issue['_id']
    return jsonify(new_issue), 201

@app.route('/api/issues/<issue_id>/resolve', methods=['POST'])
def resolve_issue(issue_id):
    if issues_collection is None:
        return jsonify({'error': 'Database unavailable'}), 503
        
    result = issues_collection.update_one(
        {'id': issue_id},
        {'$set': {'status': 'resolved'}}
    )
    
    if result.modified_count > 0:
        updated_issue = issues_collection.find_one({'id': issue_id}, {'_id': 0})
        return jsonify(updated_issue)
    return jsonify({'error': 'Issue not found'}), 404

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # Simple mock authentication
    if email and password:
        return jsonify({
            'name': 'John Doe',
            'email': email,
            'token': 'mock-jwt-token'
        })
    return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    seed_data()
    app.run(debug=True, port=5000)
