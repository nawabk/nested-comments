import React, { useState } from 'react';
import axios from 'axios';

import { BASE_URL, getAuthHeader } from '../../utils/shared';

const AddComment = ({ setComments }) => {
  const [text, setText] = useState('');

  const addCommentHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/comments`,
        { text },
        getAuthHeader()
      );
      setComments(prevComments => [res.data, ...prevComments]);
    } catch (err) {}
  };
  return (
    <div className='paper addcomment__paper'>
      <div className='addcomment'>
        <label htmlFor='addComment' className='addcomment__label'>
          Add Comment
        </label>
        <textarea
          id='addComment'
          className='addcomment__control'
          onChange={e => setText(e.target.value)}
        />
        <button
          className='btn addcomment__btn'
          disabled={!text}
          onClick={addCommentHandler}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
