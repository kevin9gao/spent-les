from flask import Blueprint, request
from app.forms.dm_form import DMForm
from app.models import DirectMessage, db
from app.models.user import User


dm_routes = Blueprint('dms', __name__)

@dm_routes.route('/<int:user_id>')
def get_dms_sent(user_id):
    sender = User.query.get(user_id)
    messages_sent = sender.messages_sent
    return {'messages': [message.to_dict() for message in messages_sent]}

@dm_routes.route('/', methods=['POST'])
def send_dm():
    form = DMForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        message = DirectMessage(sender_id=data['sender_id'],
                                recipient_id=data['recipient_id'],
                                message_body=data['message_body'],
                                created_at=data['created_at'])
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
