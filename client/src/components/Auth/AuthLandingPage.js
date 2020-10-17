import React, { useState } from 'react';

import Login from './Login';
import Signup from './Signup';

const AuthLandingPage = ({ setAlert, dispatch }) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='auth-box'>
      {isLogin ? <Login dispatch={dispatch} /> : <Signup setAlert={setAlert} />}
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
  );
};

export default AuthLandingPage;
