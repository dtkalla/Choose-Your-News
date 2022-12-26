import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import MainPage from './components/MainPage/MainPage';
import Articles from './components/Articles/Articles';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';
import AboutUs from './components/AboutUs/AboutUs';

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

        <ProtectedRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/articles" component={Articles} />
        <ProtectedRoute exact path="/about" component={AboutUs} />

      </Switch>
      <Footer />
    </>
  );
}

export default App;