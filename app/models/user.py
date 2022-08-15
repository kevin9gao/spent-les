from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    annual_income = db.Column(db.Numeric(10,2), nullable=True)
    profile_pic_url = db.Column(db.String(500), nullable=True, default='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZTgJiqRWL5wWednBz8zyRUhSuEDTzefieg&usqp=CAU')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'annual_income': str(self.annual_income),
            'profile_pic_url': self.profile_pic_url
        }

    spending_plans = db.relationship('SpendingPlan', back_populates='user', cascade='all, delete')
    tips = db.relationship('Tip', back_populates='user', cascade='all, delete')
    messages_sent = db.relationship("DirectMessage", back_populates="sender")
