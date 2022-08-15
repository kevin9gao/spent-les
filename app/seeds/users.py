from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_pic_url='https://wiki.teamfortress.com/w/images/thumb/7/7e/Community_Demo_Strategy_Header.png/400px-Community_Demo_Strategy_Header.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_pic_url='https://static.wikia.nocookie.net/pokemon/images/a/a0/Marnie_anime.png/revision/latest?cb=20220226152605')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_pic_url='https://m.media-amazon.com/images/M/MV5BNjRlYjgwMWMtNDFmMy00OWQ0LWFhMTMtNWE3MTU4ZjQ3MjgyXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_QL75_UX500_CR0,47,500,281_.jpg')
    kevin = User(
        username='kevin', email='kevin@aa.io', password='password', profile_pic_url='https://avatars.githubusercontent.com/u/100536560?v=4')
    derek = User(
        username='derek', email='derek@aa.io', password='password', profile_pic_url='https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/293318910_1420357665042495_3654094449794606536_n.jpg?stp=dst-jpg_p1080x2048&_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=RDzHEGb6uicAX-xM6Is&_nc_ht=scontent-sjc3-1.xx&oh=03_AVK6Odq0l4S2IQnpxKX6uIByi-H70G4SSOS2u6GcZKxw6A&oe=631DEC70')
    dindin = User(
        username='dindin', email='dindin@aa.io', password='password', profile_pic_url='https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/275714552_1114038789329302_6007451642868222604_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=uZyJ_5MI3IMAX_uWiEo&_nc_ht=scontent-sjc3-1.xx&oh=03_AVLpd1Sj7vQJKLrdEPbK6YTRuq4mRoYrMIDaAwqamxGtDQ&oe=63207AFF')
    ahri = User(
        username='ahri', email='ahri@aa.io', password='password', profile_pic_url='https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/275770570_1153029305522382_7162907964538257610_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=r2SjLi7u8eIAX9HHhI5&_nc_ht=scontent-sjc3-1.xx&oh=03_AVL4Ah3Mvjy0Rzjumqa3pnPXPE7UpGg4gZF-Gjo4wEPomg&oe=6320DC12')

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
