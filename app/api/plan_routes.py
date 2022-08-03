from flask import Blueprint, request
from app.forms.plan_form import PlanForm
from app.models import SpendingPlan, db

plan_routes = Blueprint('plans', __name__)


@plan_routes.route('/')
def get_all_plans():
    plans = SpendingPlan.query.all()
    return {'plans': [plan.to_dict() for plan in plans]}


@plan_routes.route('/<int:id>')
def get_plan(id):
    plan = SpendingPlan.query.get(id)
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
