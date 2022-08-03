from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField
from wtforms.validators import DataRequired


class TipForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    plan_id = IntegerField('plan_id', validators=[DataRequired()])
    tip_body = StringField('tip_body', validators=[DataRequired()])
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
