/*
Requests required for Data handling
*/

import axios from 'axios'

function getBandwidth (payload, success, failure) {
  axios.post(
    'http://localhost:3000/bandwidth',
    {
      'session_token': payload.token,
      from: payload.fromTime,
      to: payload.toTime
    })
    .then(success)
    .catch(failure)
}

function getAudience (payload, success, failure) {
  axios.post(
    'http://localhost:3000/audience',
    {
      'session_token': payload.token,
      from: payload.fromTime,
      to: payload.toTime
    })
    .then(success)
    .catch(failure)
}

export default {
  getBandwidth,
  getAudience
}
