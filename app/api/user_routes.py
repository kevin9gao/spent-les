from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.user_form import UserForm
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
def edit_user(id):
    user = User.query.get(id)
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('-------FORM DATA---------', form.data)
    if form.validate_on_submit():
        data = form.data
        user.annual_income = data['annual_income']
        user.profile_pic_url = data['profile_pic_url']
        db.session.commit()
        return user.to_dict()
