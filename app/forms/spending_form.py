from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DecimalField, DateField
from wtforms.validators import DataRequired


class SpendingForm(FlaskForm):
    plan_id = IntegerField('plan_id', validators=[DataRequired()])
    transaction_name = StringField('transaction_name', validators=[DataRequired()])
    transaction_notes = StringField('transaction_notes', validators=[DataRequired()])
    amount = DecimalField('amount', validators=[DataRequired()])
    date = DateField('date', validators=[DataRequired()])
