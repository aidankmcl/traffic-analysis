/*
Requests required for User actions
*/

import axios from 'axios'

import { buildTokenRequest } from './helpers.js'

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

const getInfo = buildTokenRequest('http://localhost:3000/myinfo')
const logout = buildTokenRequest('http://localhost:3000/logout')

export default {
  login,
  getInfo,
  logout
}
