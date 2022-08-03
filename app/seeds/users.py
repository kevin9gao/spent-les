from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    kevin = User(
        username='kevin', email='kevin@aa.io', password='password')
    derek = User(
        username='derek', email='derek@aa.io', password='password')
    dindin = User(
        username='dindin', email='dindin@aa.io', password='password')
    ahri = User(
        username='ahri', email='ahri@aa.io', password='password')

    users = [demo, marnie, bobbie, kevin, derek, dindin, ahri]

    for user in users:
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
