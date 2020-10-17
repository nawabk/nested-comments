export const BASE_URL = 'http://localhost:5000/api';

export const getAuthHeader = () => {
  if (localStorage.getItem('token') !== null) {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
  }
};
