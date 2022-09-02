from .db import db
from sqlalchemy.sql import func


class Tip(db.Model):
    __tablename__ = 'tips'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    plan_id = db.Column(db.Integer, db.ForeignKey('spending_plans.id'), nullable=False)
    tip_body = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'plan_id': self.plan_id,
            'tip_body': self.tip_body,
            'created_at': self.created_at
        }

    plan = db.relationship('SpendingPlan', back_populates='tips')
    user = db.relationship('User', back_populates='tips')
