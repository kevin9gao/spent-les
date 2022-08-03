from flask import Blueprint, request
from app.forms.spending_form import SpendingForm
from app.models import Spending, db

spending_routes = Blueprint('spendings', __name__)


@spending_routes.route('/<int:id>')
def get_spending(id):
    spending = Spending.query.get(id)
    return spending.to_dict()

@spending_routes.route('/', methods=['POST'])
def create_spending():
    form = SpendingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        spending = Spending(plan_id=data['plan_id'],
                            transaction_name=data['transaction_name'],
                            transaction_notes=data['transaction_notes'],
                            amount=data['amount'],
                            date=data['date'])
        db.session.add(spending)
        db.session.commit()
        return spending.to_dict()
