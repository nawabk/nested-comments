import React from 'react';

const NotificationBox = ({ message }) => {
  return (
    <div className='notificationbox'>
      <p className='notificationbox__message'>{message}</p>
    </div>
  );
};

export default NotificationBox;
