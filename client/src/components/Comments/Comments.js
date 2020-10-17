import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Comment from './Comment';
import AddComment from './AddComment';
import { BASE_URL, getAuthHeader } from '../../utils/shared';
import Topbar from '../Topbar/Topbar';

const Comments = ({ loggedInUser, logoutHandler }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchAllComments() {
      try {
        const res = await axios.get(`${BASE_URL}/comments`, getAuthHeader());
        setComments(res.data);
      } catch (err) {}
    }
    fetchAllComments();
  }, []);

  return (
    <>
      <Topbar loggedInUser={loggedInUser} logoutHandler={logoutHandler} />
      <div className='main-content'>
        <AddComment setComments={setComments} />
        <div className='paper'>
          <ul className='comments__list'>
            {comments.map(comment => (
              <li className='comments__item' key={comment._id}>
                <Comment
                  comment={comment}
                  loggedInUser={loggedInUser}
                  depth={1}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Comments;
