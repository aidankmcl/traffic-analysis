/*
Store for sharing User state across application
*/

import UserAPI from './../../api/user'

export default {
  state: {
    token: '',
    info: {}
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, userInfo) {
      state.info = userInfo
    }
  },
  getters: {
    info (state) {
      return state.info
    }
  },
  actions: {
    login ({ state, commit }, credentials) {
      /*
      Provided an object containing {username: ..., password: ...} will use the
      frontend API to issue a request.

      Returns either a token on success or an error response on failure.
      */

      return new Promise((resolve, reject) => {
        if (state.token !== '') return resolve(state.token) // if logged in, no need!
        /*
        Note: If you get out of sync with server as is, the only recourse would
        be to clear your cookies and retry logging in. Could do this programmatically.
        */

        UserAPI.login(
          credentials,
          function success (res) {
            commit('setToken', res.data['session_token'])
            resolve(res.data['session_token'])
          },
          function failure (err) {
            // FUTURE: Handle already being logged in (loosely handled by router)
            reject(err.response)
          })
      })
    },

    logout ({ state, commit }) {
      /*
      Provided an active token, logs user out on the server and redirects to login
      */

      return new Promise((resolve, reject) => {
        if (state.token === '') reject(Error('You\'re not currently logged in!'))

        UserAPI.logout(
          state.token,
          function success (res) {
            commit('setToken', '')
            commit('setUser', {})
            resolve(res.data)
          },
          function failure (err) {
            // FUTURE: Handle already being logged in (loosely handled by router)
            reject(err.response)
          })
      })
    },

    getUserInfo ({ commit }, token) {
      /*
      Provided an active session token, returns information about a user.
      */

      return new Promise((resolve, reject) => {
        UserAPI.getInfo(
          token,
          function success (res) {
            commit('setUser', res.data)
            resolve(res.data)
          },
          function failure (err) {
            reject(err.response)
          })
      })
    }

  }
}
