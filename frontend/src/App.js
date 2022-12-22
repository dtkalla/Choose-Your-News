import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import Groups from './components/Groups/Groups';
import GroupShow from './components/Groups/GroupShow';
import Articles from './components/Articles/Articles';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Tweets from './components/Tweets/Tweets';
import Profile from './components/Profile/Profile';
import TweetCompose from './components/Tweets/TweetCompose';

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => !!state.session.user);

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      {loggedIn && <NavBar />}
      <Switch>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/index" component={MainPage} />
        <ProtectedRoute exact path="/groups" component={Groups} />
        {/* <ProtectedRoute path="/groups/:id" component={GroupShow} /> */}
        <ProtectedRoute exact path="/articles" component={Articles} />
        <ProtectedRoute exact path="/tweets" component={Tweets} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/tweets/new" component={TweetCompose} />
      </Switch>
    </>
  );
}

export default App;
