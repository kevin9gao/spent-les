# Spent-Lès

Spent-Lès is a full-stack web application that allows users to keep track of
their monthly spendings and manage their finances through viewing their total
monthly spendings and cash flow over each month. Styling of Spent-Lès is based off
of [Asana](https://app.asana.com/).

_For a link to the live site, click here: [Spent-Lès](https://spent-les.herokuapp.com/)._

_For a link to the wiki, click here: [Wiki](https://github.com/kevin9gao/spent-les/wiki)._

![Splash Page](./images/spent-les%20splash%20page.png)

## Technologies Used
* **Languages:** Javascript, Python, HTML/CSS
* **Backend:** Flask
* **Frontend:** React, Redux
* **Database:** PostgreSQL
* **Hosting:** Heroku


## Features and Implementation

### Backend

_Python/Flask Based Router_

Spent-Lès' backend is Python/Flask based, using Flask based route handlers to handle all backend requests. Flask is a Python framework used to handle CRUD routes, database modeling, and backend validations.

_Flask-SQLAlchemy Based Database and Models_

Spent-Lès' database is handled by Flask-SQLAlchemy. Flask-SQLAlchemy is used to generate the models and associations, and to create new entries in the database.


### Frontend

_React-Redux Based Frontend_

Spent-Lès is a React based app, utilizing React components, React context, and Redux to handle application state.


### Authentication

_Flask-Based Authentication_

Spent-Lès uses Flask session to store and restore user login state, using Flask-Login in the backend to validate and restore logins, and Redux in the frontend to restore login state in the Redux store.

_Features Available Without Logging In_

A user that is not logged in is actually redirected upon trying to access any of the
site's assets. Login is required through the use of backend login authentication with Flask and frontend login authentication through React-Redux.

_Features Available to Logged In Users_

A logged in user is able to create, edit, and delete their own monthly spending plans, browse other users and their spending plans, and leave, edit, and delete tips (aka reviews) on other users' plans.

### **Spending Plans**

A logged in user may create their own monthly spending plans. If the user has not created any spending plans, text will appear that instructs the user how to do so. The user may click the "Create a new plan" button, which causes a modal form to appear.

![Create Spending Plan Button](./images/spent-les%20create%20plan%20button.png)

The user may fill in all required fields on this form with the correct data types to create a new spending plan.

![Create Plan Form](./images/spent-les%20create%20plan%20form.png)

The user may click on a calendar date, and a sidebar will appear with a button that can be clicked on to log a new spending.

![New Spending Form](./images/spent-les%20new%20spending%20form.png)

The user may fill out the form with valid data and click "Submit", upon which the new spending will appear in the sidebar, and the calendar grid for that date will be populated with a $ for spendings in the one digit range, $$ for spendings in the 2 digit spending range, and $$$ for spendings in the 3 digit range or higher.

![Spendings Sidebar](./images/spent-les%20spending%20sidebar%20and%20icons.png)

If the user so wishes, they can click the month selector in the top right to go to a different month and log spendings from another month.

![Month Selector](./images/spent-les%20month%20selector.png)

With logged spendings in a month, Spent-Lès will calculate the total amount of money that the user has spent in that month, and can calculate the user's total cash flow based on total spendings, the user's input annual income (input via the profile button in the top right > Edit Profile), and any additional income earned that month (input via either the create plan form or the edit plan form).

![Spending Breakdowns Past Month](./images/spent-les%20breakdowns%20previous%20month.png)

When viewing the spending plan for the current month, cash flow will be calculated based on the total income prorated to the current date, in order to better visualize net cash flow for that month.

![Spending Breakdowns Current Month](./images/spent-les%20breakdowns%20current%20month.png)


### **Home Page**

The user's home page can be accessed upon login or clicking of the "Home" tab in the navigation bar, and displays a list of the user's spending plans, displayed as widgets. Interactivity with widgets coming in the future.

![Home Page](./images/spent-les%20home%20page.png)


### **Tips**

A logged in user may find and view other users' spending plans through the "Users" tab in the navigation bar. Upon click, a list of users of Spent-Lès will appear, each one being clickable and will redirect to that user's profile page.

![Users List](./images/spent-les%20users%20page.png)

![User Profile Page](./images/spent-les%20user%20profile.png)

On another user's spending calendar, the user may leave a tip, or review, of that user's spendings for that month. The user may also edit and delete their review.

![Tip Section](./images/spent-les%20tip%20section.png)


## How to Start the Development Environment
1. Clone this repository:

    ```git clone https://github.com/kevin9gao/spent-les.git```
2. Install dependencies:

    ```pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt```
3. Create a **.env** file based on the example with the proper settings for your development environment
4. Setup your PostgresSQL user,password, and database and make sure it matches with your **.env** file
5. Enter your environment, migrate your database, seed your database, and run your flask app
    * ```pipenv shell```
    * ```flask db upgrade```
    * ```flask seed all```
    * ```flask run```
6. cd into your react-app directory and install dependencies and run the app
    * ```npm install```
    * ```npm start```
7. Open your browser and go to the localhost address you are running the app in


## Future Features To Implement

* Friends List
* DMs
* Linking to bank account to automate logging spendings


## Technical Feature Implementation

Populating the calendar correctly with the days that each month should begin on, in addition to the dates that should lead in from the previous month and the dates leading into the next month proved relatively difficult. This issue was circumvented using the _momentjs_ framework, a JavaScript date framework that has more options than the default JavaScript Date object.

The implementation of the Home Page, with a list of spending breakdowns from multiple months, also proved quite difficult. This was ultimately done by populating the state with all the user's plans and spendings, then filtering through those spendings to obtain the correct numbers for each calculation.
