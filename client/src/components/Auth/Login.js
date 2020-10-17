import React, { useState } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../utils/shared';
import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../../utils/actionTypes';

const Login = ({ dispatch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmitHandler = async e => {
    e.preventDefault();
    const body = {
      email,
      password
    };
    try {
      const res = await axios.post(`${BASE_URL}/users/login`, body);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch({
        type: AUTH_LOADING
      });
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          token: res.data.token,
          user: res.data.user
        }
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response
      });
    }
  };
  return (
    <form className='form' onSubmit={formSubmitHandler}>
      <h2>Login</h2>
      <div className='form__group'>
        <label htmlFor='email' className='form__label'>
          Email
        </label>
        <input
          type='email'
          className='form__control'
          id='email'
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='password' className='form__label'>
          Password
        </label>
        <input
          type='password'
          className='form__control'
          id='password'
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button className='btn form__btn'>Login</button>
    </form>
  );
};

export default Login;
