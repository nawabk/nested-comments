import React from 'react';

const Topbar = ({ loggedInUser, logoutHandler }) => {
  return (
    <div className='topbar'>
      <h2 className='topbar__user'>Hey,{loggedInUser.name}</h2>
      <span className='topbar__link' onClick={logoutHandler}>
        Logout
      </span>
    </div>
  );
};

export default Topbar;
