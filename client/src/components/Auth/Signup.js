import React, { useState } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../utils/shared';
import { AUTH_SUCCESS, AUTH_ERROR } from '../../utils/actionTypes';

const Signup = ({ setAlert, dispatch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const formSubmitHandler = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setAlert({
        message: 'Password confirm does not match with the password',
        type: 'error'
      });
    }
    try {
      const body = {
        name,
        email,
        password,
        passwordConfirm
      };
      const res = await axios.post(`${BASE_URL}/users/signup`, body);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          token: res.data.token,
          user: res.data.user
        }
      });
    } catch (err) {
      setAlert({
        message:
          'There is some problem while creating your account...please try again later',
        type: 'error'
      });
      dispatch({
        type: AUTH_ERROR,
        payload: err.response
      });
    }
  };

  return (
    <form className='form' onSubmit={formSubmitHandler}>
      <h2>Signup</h2>
      <div className='form__group'>
        <label htmlFor='name' className='form__label'>
          Name
        </label>
        <input
          type='name'
          className='form__control'
          id='name'
          required
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='email' className='form__label'>
          Email
        </label>
        <input
          type='email'
          className='form__control'
          id='email'
          required
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
          required
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className='form__group'>
        <label htmlFor='passwordConfirm' className='form__label'>
          Password Confirm
        </label>
        <input
          type='password'
          className='form__control'
          id='passwordConfirm'
          required
          onChange={e => setPasswordConfirm(e.target.value)}
        />
      </div>
      <button className='btn form__btn'>Signup</button>
    </form>
  );
};

export default Signup;
