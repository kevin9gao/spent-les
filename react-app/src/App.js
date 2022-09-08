import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import SpendingPlanMain from './components/SpendingPlan/SpendingPlanMain';
import SpendingsBreakdown from './components/SpendingPlan/SpendingsBreakdown';
import Calendar from './components/SpendingPlan/Calendar';
import SplashPage from './components/SplashPage/SplashPage';
import UsersPage from './components/Users/UsersPage';
import Footer from './components/Footer';

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <div className='app-formatting-wrapper'>
          {user && <Navigation />}
          <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path='/users/list' exact={true}>
              <UsersPage />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId' exact={true} >
              <User />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId/:page' exact={true} >
              <UsersPage />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId/plans' exact={true}>
              <SpendingPlanMain />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId/plans/:breakdownOrCalendar' exact={true}>
              <SpendingPlanMain />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId/calendar/:date' exact={true}>
              <Calendar WEEKDAYS={WEEKDAYS} MONTHS={MONTHS} />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId/plans/:breakdownOrCalendar/:date' exact={true}>
              <SpendingPlanMain WEEKDAYS={WEEKDAYS} MONTHS={MONTHS} />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId/DMs' exact={true}>
              Inbox
            </ProtectedRoute>
            <ProtectedRoute path='/home/:page' exact={true} >
              <HomePage WEEKDAYS={WEEKDAYS} MONTHS={MONTHS} />
            </ProtectedRoute>
            <Route path='/' exact={true} >
              <SplashPage />
            </Route>
          </Switch>
        </div>
        {user && (
          <footer>
            <Footer />
          </footer>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
