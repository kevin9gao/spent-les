from .db import db


class Spending(db.Model):
    __tablename__ = 'spendings'

    id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Integer, db.ForeignKey('spending_plans.id'), nullable=False)
    transaction_name = db.Column(db.String(50), nullable=False)
    transaction_notes = db.Column(db.String(500), nullable=True)
    amount = db.Column(db.Numeric(10,2), nullable=False)
    date = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'plan_id': self.plan_id,
            'transaction_name': self.transaction_name,
            'transaction_notes': self.transaction_notes,
            'amount': self.amount,
            'date': self.date
        }

    plan = db.relationship('SpendingPlan', back_populates='spendings')
