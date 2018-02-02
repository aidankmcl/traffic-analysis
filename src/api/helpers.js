/*
Helpers for DRY API code :)
*/

import axios from 'axios'

const buildRangeRequest = function (url) {
  return function (payload, success, failure) {
    let data = {
      'session_token': payload.token,
      from: payload.fromTime,
      to: payload.toTime
    }

    if (payload.aggregate) data['aggregate'] = payload.aggregate

    axios.post(url, data)
      .then(success)
      .catch(failure)
  }
}

const buildTokenRequest = function (url) {
  return function (token, success, failure) {
    let data = {
      'session_token': token
    }

    axios.post(url, data)
      .then(success)
      .catch(failure)
  }
}

export {
  buildRangeRequest,
  buildTokenRequest
}
