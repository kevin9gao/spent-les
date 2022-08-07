from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField, DecimalField, TextAreaField
from wtforms.validators import DataRequired


class PlanForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    plan_name = StringField('plan_name', validators=[DataRequired()])
    month = IntegerField('month', validators=[DataRequired()])
    year = IntegerField('year', validators=[DataRequired()])
    private = BooleanField('private')
    additional_income = DecimalField('additional_income')
    additional_income_notes = StringField('additional_income_notes')
    notes = TextAreaField('notes')
