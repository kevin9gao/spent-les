from flask import Blueprint, request
from app.forms.tip_form import TipForm
from app.models import Tip, db
from app.models.spending_plan import SpendingPlan

tip_routes = Blueprint('tips', __name__)


@tip_routes.route('/<int:id>')
def get_tip(id):
    tip = Tip.query.get(id)
    return tip.to_dict()

@tip_routes.route('/plans/<int:plan_id>')
def get_plan_tip(plan_id):
    plan = SpendingPlan.query.get(plan_id)
    plan_tips = plan.tips
    tips = [tip.to_dict() for tip in plan_tips]
    for i, tip in enumerate(tips):
        tip['user'] = plan_tips[i].user.to_dict()
    return {'tips': tips}

@tip_routes.route('/', methods=['POST'])
def leave_tip():
    form = TipForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        plan = SpendingPlan.query.get(data['plan_id'])
        new_tip = Tip(user_id=data['user_id'],
                        plan_id=data['plan_id'],
                        tip_body=data['tip_body'])
        db.session.add(new_tip)
        db.session.commit()
        return new_tip.to_dict()

@tip_routes.route('/<int:id>', methods=['PUT'])
def edit_tip(id):
    form = TipForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        tip = Tip.query.get(id)
        tip.user_id = data['user_id']
        tip.plan_id = data['plan_id']
        tip.tip_body = data['tip_body']
        tip.created_at = data['created_at']
        db.session.commit()
        return tip.to_dict()

@tip_routes.route('/<int:id>', methods=['DELETE'])
def delete_tip(id):
    tip = Tip.query.get(id)
    db.session.delete(tip)
    db.session.commit()
    return tip.to_dict()
