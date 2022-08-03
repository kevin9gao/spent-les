from flask.cli import AppGroup
from .users import seed_users, undo_users
from .spending_plans import seed_spending_plans, undo_spending_plans

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_spending_plans()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_spending_plans()
    # Add other undo functions here
