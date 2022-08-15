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
    kevin_august = SpendingPlan(plan_name="kevin - August 2022",
     user_id=4,
     month=8,
     year=2022,
     private=False,
     additional_income=1000,
     additional_income_notes='Won $1000 from a giveaway',
     notes='Gotta save more money on food'
     )
    marnie_july = SpendingPlan(plan_name="marnie - July 2022",
     user_id=2,
     month=7,
     year=2022,
     private=False,
     additional_income=200,
     additional_income_notes='Won $200 from a guy',
     notes='Gotta save more money on guy'
     )
    demo_july = SpendingPlan(plan_name="demo - July 2022",
     user_id=1,
     month=7,
     year=2022,
     private=False,
     additional_income=3567.89,
     additional_income_notes='ayyy got some munny',
     notes='I am a demolitionist.'
     )
    kevin_may = SpendingPlan(plan_name="kevin - May 2022",
     user_id=4,
     month=5,
     year=2022,
     private=False,
     additional_income=6000,
     additional_income_notes='Won $6000 from birthday',
     notes='My birthday was this month'
     )
    kevin_april = SpendingPlan(plan_name="kevin - April 2022",
     user_id=4,
     month=4,
     year=2022,
     private=False,
     additional_income=367.33,
     additional_income_notes='Not sure where extra money came from',
     notes='My birthday is next month'
     )

    spending_plans = [kevin_july,
                      kevin_june,
                      dindin_december,
                      ahri_july,
                      kevin_august,
                      marnie_july,
                      demo_july,
                      kevin_may,
                      kevin_april]

    for spending_plan in spending_plans:
        db.session.add(spending_plan)

    db.session.commit()

def undo_spending_plans():
    db.session.execute('TRUNCATE spending_plans RESTART IDENTITY CASCADE;')
    db.session.commit()
