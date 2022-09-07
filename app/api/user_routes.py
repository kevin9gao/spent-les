from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.user_form import UserForm
from app.forms.follow_form import FollowForm
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

@user_routes.route('/<int:follower_id>/follow/<int:followed_id>', methods=['POST'])
def follow_user(follower_id, followed_id):
    follower = User.query.get(follower_id)
    followed = User.query.get(followed_id)
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        follower.follow(followed)
        db.session.commit()
        return followed.to_dict()

@user_routes.route('/<int:follower_id>/unfollow/<int:followed_id>', methods=['POST'])
def unfollow_user(follower_id, followed_id):
    follower = User.query.get(follower_id)
    followed = User.query.get(followed_id)
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        follower.unfollow(followed)
        db.session.commit()
        return followed.to_dict()

@user_routes.route('/<int:id>/followers')
def followers(id):
    user = User.query.get(id)
    followers = user.followers
    return {'followers': [follower.to_dict() for follower in followers]}

@user_routes.route('/<int:id>/followed')
def followed(id):
    user = User.query.get(id)
    followed = user.followed
    return {'followed': [followed.to_dict() for followed in followed]}
