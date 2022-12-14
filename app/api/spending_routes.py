from flask import Blueprint, request
from app.forms.spending_form import SpendingForm
from app.models import Spending, db
from app.models.spending_plan import SpendingPlan
from app.models.user import User

spending_routes = Blueprint('spendings', __name__)


@spending_routes.route('/')
def get_all_spendings():
    spendings = Spending.query.all()
    return {'spendings': [spending.to_dict() for spending in spendings]}

@spending_routes.route('/plan/<int:plan_id>')
def get_user_spendings(plan_id):
    plan = SpendingPlan.query.get(plan_id)
    spendings = plan.spendings
    return {'spendings': [spending.to_dict() for spending in spendings]}

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
                            date=data['date'],
                            month=data['month'],
                            year=data['year'],
                            day=data['day'],
                            user_id=data['user_id'])
        db.session.add(spending)
        db.session.commit()
        return spending.to_dict()

@spending_routes.route('/<int:id>', methods=['PUT'])
def edit_spending(id):
    spending = Spending.query.get(id)
    form = SpendingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        spending.transaction_name = data['transaction_name']
        spending.transaction_notes = data['transaction_notes']
        spending.amount = data['amount']
        db.session.commit()
        return spending.to_dict()

@spending_routes.route('/<int:id>', methods=['DELETE'])
def delete_spending(id):
    spending = Spending.query.get(id)
    db.session.delete(spending)
    db.session.commit()
    return spending.to_dict()
