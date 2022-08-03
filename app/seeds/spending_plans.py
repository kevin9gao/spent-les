from app.models import db, SpendingPlan

def seed_spending_plans():
    kevin_july = SpendingPlan(plan_name="kevin - July 2022",
     user_id=4,
     month=7,
     year=2022,
     private=False,
     additional_income=240.42,
     additional_income_notes='Earned a little extra for some tutoring',
     notes="Ahri's vet trips were so dang expensive"
     )
    kevin_june = SpendingPlan(plan_name="kevin - June 2022",
     user_id=4,
     month=6,
     year=2022,
     private=False,
     additional_income=100,
     additional_income_notes='Won $100 from a giveaway',
     notes='Gotta save more money on food'
     )
    dindin_december = SpendingPlan(plan_name="dindin - December 2021",
     user_id=6,
     month=12,
     year=2021,
     private=False,
     additional_income=56.34,
     additional_income_notes='Woof woof',
     notes='Money is so ruff to get your paws on'
     )
    ahri_july = SpendingPlan(plan_name="ahri - July 2022",
     user_id=7,
     month=7,
     year=2022,
     private=True,
     additional_income=.50,
     additional_income_notes='Meowwwwww',
     notes='Mraowwwwwwwwwwwww'
     )

    spending_plans = [kevin_july, kevin_june, dindin_december, ahri_july]

    for spending_plan in spending_plans:
        db.session.add(spending_plan)

    db.session.commit()

def undo_spending_plans():
    db.session.execute('TRUNCATE spending_plans RESTART IDENTITY CASCADE;')
    db.session.commit()
