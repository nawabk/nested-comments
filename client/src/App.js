import React, { useEffect, useState, useReducer } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import AuthLandingPage from './components/Auth/AuthLandingPage';
import './App.css';
import Alert from './components/Alert/Alert';
import * as uuid from 'uuid';
import Comments from './components/Comments/Comments';
import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT
} from './utils/actionTypes';
import { BASE_URL, getAuthHeader } from './utils/shared';
import Loader from './components/Loader/Loader';

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload
      };
    default:
      return state;
  }
};

function App() {
  const [alerts, setAlerts] = useState([]);

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    token: null,
    user: null,
    isAuthenticated: false,
    error: null
  });

  const setAlert = newAlert => {
    newAlert.id = uuid.v4();
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
    setTimeout(() => {
      setAlerts(prevAlerts =>
        prevAlerts.filter(alert => alert.id !== newAlert.id)
      );
    }, 5000);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({
      type: AUTH_LOGOUT
    });
  };

  useEffect(() => {
    async function checkStatus() {
      try {
        await axios.get(`${BASE_URL}/users/isTokenValid`, getAuthHeader());
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            token: localStorage.getItem('token'),
            user: JSON.parse(localStorage.getItem('user'))
          }
        });
      } catch (err) {
        dispatch({
          type: AUTH_ERROR,
          payload: err.response
        });
      }
    }
    checkStatus();
  }, []);

  const routes = !state.loading ? (
    state.isAuthenticated ? (
      <>
        <Route
          path='/comments'
          render={() => (
            <Comments loggedInUser={state.user} logoutHandler={logoutHandler} />
          )}
        />
        <Route path='*'>
          <Redirect to='/comments' />
        </Route>
      </>
    ) : (
      <>
        <Route
          path='/login'
          render={() => (
            <AuthLandingPage setAlert={setAlert} dispatch={dispatch} />
          )}
        />
        <Route path='*'>
          <Redirect to='/login' />
        </Route>
      </>
    )
  ) : (
    <div className='loading__container'>
      <Loader />
    </div>
  );
  return (
    <>
      {alerts.length > 0 && (
        <div className='alert__container'>
          {alerts.map((alert, index) => (
            <Alert message={alert.message} key={index} />
          ))}
        </div>
      )}
      {routes}
    </>
  );
}

export default App;
