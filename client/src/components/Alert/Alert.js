import React from 'react';

const Alert = ({ message }) => {
  return (
    <div className='alert alert__top-right'>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
