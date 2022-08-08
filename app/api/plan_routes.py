from flask import Blueprint, request
from app.forms.plan_form import PlanForm
from app.models import SpendingPlan, User, db

plan_routes = Blueprint('plans', __name__)


@plan_routes.route('/')
def get_all_plans():
    plans = SpendingPlan.query.all()
    return {'plans': [plan.to_dict() for plan in plans]}

@plan_routes.route('/users/<int:user_id>/plan/<date>')
def get_plan(user_id, date):
    print('backend single plan route')
    year = int(date[:4])
    month = int(date[5:])
    print('year, month', year, month)
    plan = SpendingPlan.query.filter(SpendingPlan.user_id == user_id,
                                     SpendingPlan.year == year,
                                     SpendingPlan.month == month).one()
    return plan.to_dict() if plan else {}

@plan_routes.route('/users/<int:id>')
def get_user_plans(id):
    user = User.query.get(id)
    plans = user.spending_plans
    return {'user_plans': [plan.to_dict() for plan in plans]}


@plan_routes.route('/', methods=['POST'])
def create_plan():
    form = PlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print('------------DATA----------------', data)
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

@plan_routes.route('/users/<int:user_id>/plan/<date>', methods=['PUT'])
def edit_plan(user_id, date):
    year = int(date[:4])
    month = int(date[5:])
    plan = SpendingPlan.query.filter(SpendingPlan.user_id == user_id,
                                     SpendingPlan.year == year,
                                     SpendingPlan.month == month).one()
    form = PlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
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
    print('HITTING DELETE ROUTE')
    plan = SpendingPlan.query.get(id)
    print('DELETE ROUTE PLAN', plan)
    db.session.delete(plan)
    db.session.commit()
    return plan.to_dict()
