from datetime import date
from app.models import Spending, db

def seed_spendings():
    kevin_july = []
    for i in range(1, 32):
        kevin_july.append(Spending(plan_id=1,
                                   transaction_name='daily spendings',
                                   transaction_notes='seeders',
                                   amount=67.56,
                                   date=date(2022, 7, i)))

    for spending in kevin_july:
        db.session.add(spending)

    kevin_august = []
    for i in range(1, 15):
        kevin_august.append(Spending(plan_id=5,
                                   transaction_name='daily spendings',
                                   transaction_notes='seeders',
                                   amount=59.46,
                                   date=date(2022, 8, i)))

    for spending in kevin_august:
        db.session.add(spending)

    marnie_july = []
    for i in range(1, 32):
        marnie_july.append(Spending(plan_id=6,
                                   transaction_name='daily spendings - too much',
                                   transaction_notes='seeders',
                                   amount=180.64,
                                   date=date(2022, 7, i)))

    for spending in marnie_july:
        db.session.add(spending)

    db.session.commit()

def undo_spendings():
    db.session.execute('TRUNCATE spendings RESTART IDENTITY CASCADE;')
    db.session.commit()
