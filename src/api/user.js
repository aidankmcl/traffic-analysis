/*
Requests required for User actions
*/

import axios from 'axios'

function login (credentials, success, failure) {
  axios.post(
    'http://localhost:3000/auth',
    {
      identifiant: credentials.username,
      password: credentials.password
    })
    .then(success)
    .catch(failure)
}

function getInfo (token, success, failure) {
  axios.post(
    'http://localhost:3000/myinfo',
    {
      'session_token': token
    })
    .then(success)
    .catch(failure)
}

export default {
  login,
  getInfo
}
