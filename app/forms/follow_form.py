from flask_wtf import FlaskForm
from wtforms import IntegerField


class FollowForm(FlaskForm):
    follower_id = IntegerField('follower_id')
    followed_id = IntegerField('followed_id')
