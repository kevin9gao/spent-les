from .db import db


class SpendingPlan(db.Model):
    __tablename__ = 'spending_plans'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    plan_name = db.Column(db.String(100), nullable=False)
    month = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    private = db.Column(db.Boolean, nullable=False)
    additional_income = db.Column(db.Numeric(10,2), nullable=True)
    additional_income_notes = db.Column(db.String(1000), nullable=True)
    notes = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'plan_name': self.plan_name,
            'month': self.month,
            'year': self.year,
            'private': self.private,
            'additional_income': str(self.additional_income),
            'additional_income_notes': self.additional_income_notes,
            'notes': self.notes
        }

    spendings = db.relationship('Spending', back_populates='plan', cascade='all, delete')
    user = db.relationship('User', back_populates='spending_plans')
    tips = db.relationship('Tip', back_populates='plan', cascade='all, delete')
