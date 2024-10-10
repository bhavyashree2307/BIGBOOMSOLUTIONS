from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/dbname'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    photo = db.Column(db.String(100), nullable=True)
    registered_on = db.Column(db.DateTime, default=datetime.utcnow)

db.create_all()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.form
    email = data.get('email')
    password = generate_password_hash(data.get('password'), method='sha256')
    name = data.get('name')
    photo = request.files['photo']
    photo_path = os.path.join('uploads', photo.filename)
    photo.save(photo_path)
    
    new_user = User(email=email, password=password, name=name, photo=photo_path)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()
    if user and check_password_hash(user.password, data.get('password')):
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_data = [{'email': user.email, 'name': user.name, 'photo': user.photo} for user in users]
    return jsonify(users_data), 200

if __name__ == '__main__':
    app.run(debug=True)
