import React, { useState } from 'react';

const Signup = ({ setAlert }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const formSubmitHandler = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setAlert({
        message: 'Password confirm does not match with the password',
        type: 'error'
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
          onChange={e => setEmail(e.target.vaue)}
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
          type='passwordConfirm'
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
