import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  const loginDemo = () => {
    setEmail('demo-user@appacademy.io');
    setPassword('starwars')

    if(email && password)
      dispatch(login(email,password)); 
  };

  const logout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className='title'>
          <h1>Choose</h1>
          <h1>Your</h1>
          <h1>News</h1>
      </div>

      <div className='form-container'>
        <form className="session-form" onSubmit={handleSubmit}>
          <label>
            <span className='field'>Email</span>
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.email}</div>
      
          <label>
            <span className='field'>Password</span>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <div className="errors">{errors?.password}</div>

          <div className='buttons'>
            <input className='signup-button'
              type="submit"
              value="Log In"
              disabled={!email || !password}
            />        
            <button className="signup-button" onClick={loginDemo}>
              Demo Login
            </button>
          </div>

          <div className='signup-link'>
            <Link className="signup-link-button" to='/signup'>Signup</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;