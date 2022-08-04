from flask import Blueprint, request
from app.forms.plan_form import PlanForm
from app.models import SpendingPlan, db
from app.models.user import User

plan_routes = Blueprint('plans', __name__)


@plan_routes.route('/')
def get_all_plans():
    plans = SpendingPlan.query.all()
    return {'plans': [plan.to_dict() for plan in plans]}

@plan_routes.route('/users/<int:user_id>')
def get_user_plans(user_id):
    user = User.query.get(user_id)
    user_plans = user.spending_plans
    return {'user_plans': [plan.to_dict() for plan in user_plans]}

@plan_routes.route('/users/<int:user_id>/plan/<str:date>')
def get_plan(user_id, date):
    month = date[5:]
    year = date[:4]
    plan = SpendingPlan.query.filter(SpendingPlan.user_id == user_id and
                                     SpendingPlan.month == month and
                                     SpendingPlan.year == year).one()
    return plan.to_dict()


@plan_routes.route('/', methods=['POST'])
def create_plan():
    form = PlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_plan = SpendingPlan(user_id=data['user_id'],
                                plan_name=data['plan_name'],
                                month=data['month'],
                                year=data['year'],
                                private=data['private'],
                                additional_income=data['additional_income'],
                                additional_income_notes=data['additional_income_notes'],
                                notes=data['notes'])
        db.session.add(new_plan)
        db.session.commit()
        return new_plan.to_dict()

@plan_routes.route('/<int:id>', methods=['PUT'])
def edit_plan(id):
    form = PlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        plan = SpendingPlan.query.get(id)
        plan.user_id = data['user_id']
        plan.plan_name = data['plan_name']
        plan.month = data['month']
        plan.year = data['year']
        plan.private = data['private']
        plan.additional_income = data['additional_income']
        plan.additional_income_notes = data['additional_income_notes']
        plan.notes = data['notes']
        db.session.commit()
        return plan.to_dict()

@plan_routes.route('/<int:id>', methods=['DELETE'])
def delete_plan(id):
    plan = SpendingPlan.query.get(id)
    db.session.delete(plan)
    db.session.commit()
    return plan.to_dict()
