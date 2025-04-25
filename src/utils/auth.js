import { checkResponse } from './api'; // Import shared response handler

export const BASE_URL = 'http://localhost:3001'; // Replace with actual API URL

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      return data;
    });
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      return data;
    });
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
