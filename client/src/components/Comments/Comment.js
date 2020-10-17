import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

import { BASE_URL, getAuthHeader } from '../../utils/shared';
import Loader from '../Loader/Loader';

const Comment = ({ comment, loggedInUser, depth }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [replies, setReplies] = useState([]);
  const [editComment, setEditComment] = useState(false);
  const [data, setData] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    setData(comment);
    setUpdatedText(comment.text);
  }, [comment]);

  const replyClickHandler = () => {
    setCollapsed(false);
  };

  const editCommentHandler = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/comments/${data._id}`,
        { text: updatedText },
        getAuthHeader()
      );
      setUpdatedText(res.data.text);
      setData(res.data);
      setEditComment(false);
    } catch (err) {}
  };

  const getCommentAudit = () => {
    if (data.createdAt === data.updatedAt) {
      return (
        <span>
          <span>Created At </span>{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{data.createdAt}</Moment>
        </span>
      );
    } else
      return (
        <span>
          <span>Last Updated </span>{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{data.updatedAt}</Moment>
        </span>
      );
  };

  return (
    <>
      {data && (
        <div className='comment'>
          <div className='comment__top'>
            <h2 className='comment__by'>{data.commentedBy.name}</h2>
            <span className='comment__at'>{getCommentAudit()}</span>
          </div>
          {!editComment ? (
            <p className='comment__text'>{data.text}</p>
          ) : (
            <div className='edit-comment'>
              <input
                type='text'
                className='form__control'
                value={updatedText}
                onChange={e => setUpdatedText(e.target.value)}
              />
              <button
                className='btn edit-comment__btn'
                disabled={updatedText === data.text}
                onClick={editCommentHandler}
              >
                Update
              </button>
              <button
                className='btn btn-secondary'
                onClick={() => {
                  setEditComment(false);
                  setUpdatedText(data.text);
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <div className='comment__links'>
            {loggedInUser._id === data.commentedBy._id && (
              <a
                href='#!'
                className='comment__link'
                onClick={() => setEditComment(true)}
              >
                Edit
              </a>
            )}
            {collapsed ? (
              <a
                href='#!'
                className='comment__link'
                onClick={replyClickHandler}
              >
                Reply
              </a>
            ) : (
              <a
                href='#!'
                className='comment__link'
                onClick={() => setCollapsed(true)}
              >
                Hide Replies
              </a>
            )}
          </div>
        </div>
      )}
      {!collapsed && (
        <div style={{ marginLeft: `${depth * 2}rem`, marginTop: '1rem' }}>
          <ReplyToComment commentId={data._id} setReplies={setReplies} />
          <Replies
            commentId={data._id}
            loggedInUser={loggedInUser}
            depth={depth}
            replies={replies}
            setReplies={setReplies}
          />
        </div>
      )}
    </>
  );
};

const ReplyToComment = ({ commentId, setReplies }) => {
  const [text, setText] = useState('');

  const replyClickHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/comments/${commentId}/reply`,
        { text },
        getAuthHeader()
      );
      setReplies(prevReplies => [res.data, ...prevReplies]);
    } catch (err) {}
  };
  return (
    <div className='reply'>
      <input
        type='text'
        className='form__control'
        onChange={e => setText(e.target.value)}
      />
      <button
        className='btn reply__btn'
        disabled={!text}
        onClick={replyClickHandler}
      >
        Reply
      </button>
    </div>
  );
};

const Replies = ({ commentId, loggedInUser, depth, replies, setReplies }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllReplies = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/comments/${commentId}/reply`,
          getAuthHeader()
        );
        setLoading(false);
        setReplies(res.data);
      } catch (err) {
        setLoading(false);
      }
    };

    if (commentId) fetchAllReplies();
  }, [commentId]);
  return (
    <ul className='comments__list'>
      {!loading ? (
        replies.map(comment => (
          <li key={comment._id} className='comments__item'>
            <Comment
              comment={comment.replyComment}
              loggedInUser={loggedInUser}
              depth={depth + 1}
            />
          </li>
        ))
      ) : (
        <Loader />
      )}
    </ul>
  );
};

export default Comment;
