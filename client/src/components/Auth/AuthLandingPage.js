import React, { useState } from 'react';

import Login from './Login';
import Signup from './Signup';
import NotificationBox from '../NotificationBox/NotificationBox';

const AuthLandingPage = ({ setAlert, dispatch }) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <NotificationBox
        message="Hey there!To signin you can use mdkhalid@gmail.com(email) or mdsarfaraz@gmail.com(email) and test@1234(password) or 
      you can create your own account.don't need to provide your original email."
      />
      <div className='auth-box'>
        {isLogin ? (
          <Login dispatch={dispatch} />
        ) : (
          <Signup setAlert={setAlert} dispatch={dispatch} />
        )}
        {isLogin ? (
          <a href='#!' onClick={() => setIsLogin(false)}>
            Create your account
          </a>
        ) : (
          <a href='#!' onClick={() => setIsLogin(true)}>
            Login with your account
          </a>
        )}
      </div>
    </>
  );
};

export default AuthLandingPage;
