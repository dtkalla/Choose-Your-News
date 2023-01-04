import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import SavedArticlesIndex from './components/Articles/SavedArticlesIndex.js';
import Footer from './components/Footer/';

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
        <ProtectedRoute 
          exact path="/savedArticles" component={SavedArticlesIndex} />
        <ProtectedRoute exact path="/about" component={AboutUs} />
      </Switch>
      {loggedIn && <Footer />}
    </>
  );
}

export default App;