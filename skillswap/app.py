from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///skillswap.db'
app.config['JWT_SECRET_KEY'] = 'super-secret'

db = SQLAlchemy(app)
jwt = JWTManager(app)

# Import models here

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    new_user = User(username=data["username"], tokens=10)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered."})

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        token = create_access_token(identity=user.id)
        return jsonify(access_token=token)
    return jsonify(message="Login failed"), 401

@app.route("/skills", methods=["GET"])
def get_skills():
    skills = Skill.query.all()
    return jsonify([{"id": s.id, "name": s.name} for s in skills])

@app.route("/swap", methods=["POST"])
@jwt_required()
def swap_skill():
    data = request.json
    user_id = get_jwt_identity()
    recipient_id = data["recipient_id"]
    skill_id = data["skill_id"]

    user = User.query.get(user_id)
    recipient = User.query.get(recipient_id)

    if user.tokens >= 5:
        user.tokens -= 5
        recipient.tokens += 5
        session = Session(skill_id=skill_id)
        db.session.add(session)
        db.session.commit()
        return jsonify(message="Swap completed.")
    return jsonify(message="Insufficient tokens"), 403