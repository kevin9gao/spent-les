from datetime import date
from app.models import Spending, db

def seed_spendings():
    kevin_august = []
    for i in range(1, 32):
        kevin_august.append(Spending(plan_id=5,
                                   transaction_name='daily spendings',
                                   transaction_notes='seeders',
                                   amount=59.46,
                                   date=date(2022, 8, i)))

    for spending in kevin_august:
        db.session.add(spending)

    db.session.commit()

def undo_spendings():
    db.session.execute('TRUNCATE spendings RESTART IDENTITY CASCADE;')
    db.session.commit()
