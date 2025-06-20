from flask import Flask, jsonify, request, send_from_directory
from config import Config
from models import db, bcrypt, Player
from auth_routes import auth
from team_routes import team
from utils import token_required
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
import os
import csv

app = Flask(__name__, static_folder='../build')
app.config.from_object(Config)

# Configure CORS with specific origin and credentials
CORS(app, 
     resources={r"/*": {"origins": "*"}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# Add request logging
@app.before_request
def log_request():
    print(f"\n=== Incoming Request ===")
    print(f"Method: {request.method}")
    print(f"URL: {request.url}")
    print(f"Headers: {dict(request.headers)}")
    if request.method in ['POST', 'PUT']:
        print(f"Data: {request.get_data()}")
    print("======================\n")

# Error handling
@app.errorhandler(IntegrityError)
def handle_integrity_error(error):
    return jsonify({"message": "Database error occurred", "error": str(error)}), 400

@app.errorhandler(Exception)
def handle_error(error):
    return jsonify({"message": "An error occurred", "error": str(error)}), 500

db.init_app(app)
bcrypt.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(team, url_prefix='/api/team')

@app.route('/api/players')
def get_players():
    try:
        with open('Players.csv', 'r') as file:
            reader = csv.DictReader(file)
            players = list(reader)
            # Convert price strings to integers
            for player in players:
                player['price'] = int(player['price'])
            return jsonify(players)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# TEST Protected route
@app.route("/api/protected")
@token_required
def protected():
    return jsonify({"message": "You're authenticated!", "user": getattr(request, 'user', None)})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=5001, debug=True)