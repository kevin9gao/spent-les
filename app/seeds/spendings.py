from datetime import date
from app.models import Spending, db

def seed_spendings():
    kevin_july = []
    for i in range(1, 32):
        kevin_july.append(Spending(plan_id=1,
                                   transaction_name='daily spendings',
                                   transaction_notes='seeders',
                                   amount=67.56,
                                   date=date(2022, 7, i),
                                   month=7,
                                   year=2022,
                                   day=i))

    for spending in kevin_july:
        db.session.add(spending)

    kevin_august = []
    for i in range(1, 15):
        kevin_august.append(Spending(plan_id=5,
                                   transaction_name='daily spendings',
                                   transaction_notes='seeders',
                                   amount=59.46,
                                   date=date(2022, 8, i),
                                   month=8,
                                   year=2022,
                                   day=i))

    for spending in kevin_august:
        db.session.add(spending)

    kevin_june = []
    for i in range(1, 31):
        kevin_june.append(Spending(plan_id=2,
                                   transaction_name='daily spendings',
                                   transaction_notes='seeders',
                                   amount=190.46,
                                   date=date(2022, 6, i),
                                   month=6,
                                   year=2022,
                                   day=i))
    for i in range(2, 31, 9):
        kevin_june.append(Spending(plan_id=2,
                                   transaction_name='splurges',
                                   transaction_notes='seeders',
                                   amount=456.32,
                                   date=date(2022, 6, i),
                                   month=6,
                                   year=2022,
                                   day=i))

    for spending in kevin_june:
        db.session.add(spending)

    marnie_july = []
    for i in range(1, 32):
        marnie_july.append(Spending(plan_id=6,
                                   transaction_name='daily spendings - too much',
                                   transaction_notes='seeders',
                                   amount=180.64,
                                   date=date(2022, 7, i),
                                   month=7,
                                   year=2022,
                                   day=i))

    for spending in marnie_july:
        db.session.add(spending)

    demo_july = []
    for i in range(1, 32):
        demo_july.append(Spending(plan_id=7,
                                   transaction_name='demolitionist supplies',
                                   transaction_notes='seeders',
                                   amount=146.94,
                                   date=date(2022, 7, i),
                                   month=7,
                                   year=2022,
                                   day=i))

    for spending in demo_july:
        db.session.add(spending)

    kevin_may = []
    for i in range(1, 32):
        kevin_may.append(Spending(plan_id=8,
                                   transaction_name='daily spendings',
                                   transaction_notes='seeders',
                                   amount=150,
                                   date=date(2022, 5, i),
                                   month=5,
                                   year=2022,
                                   day=i))
    kevin_may.append(Spending(plan_id=8,
                                   transaction_name='birthday dinner!!!!',
                                   transaction_notes='seeders',
                                   amount=526.49,
                                   date=date(2022, 5, 29),
                                   month=5,
                                   year=2022,
                                   day=i))

    for spending in kevin_may:
        db.session.add(spending)

    kevin_april = []
    for i in range(1, 31):
        kevin_april.append(Spending(plan_id=9,
                                   transaction_name='daily spendings',
                                   transaction_notes='seeders',
                                   amount=150,
                                   date=date(2022, 4, i),
                                   month=4,
                                   year=2022,
                                   day=i))

    for spending in kevin_april:
        db.session.add(spending)

    kevin_september = []
    for i in range(1, 7):
        kevin_september.append(Spending(plan_id=10,
                                   transaction_name='daily spendings hah',
                                   transaction_notes='seeders',
                                   amount=100,
                                   date=date(2022, 9, i),
                                   month=9,
                                   year=2022,
                                   day=i))

    for spending in kevin_september:
        db.session.add(spending)


    db.session.commit()

def undo_spendings():
    db.session.execute('TRUNCATE spendings RESTART IDENTITY CASCADE;')
    db.session.commit()
