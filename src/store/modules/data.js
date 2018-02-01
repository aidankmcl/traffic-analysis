/*
Store for maintaining streaming data across application
*/

import DataAPI from './../../api/data'

const now = Date.now()
var then = new Date()
then.setDate(then.getDate() - 15)

export default {
  state: {
    fromTime: then.getTime(),
    toTime: now,
    networkData: {}
  },
  mutations: {
    setData (state, networkData) {
      state.networkData = networkData
    },
    // Both of these take time in milliseconds since epoch
    setFromTime (state, time) {
      return time
    },
    setToTime (state, time) {
      return time
    }
  },
  actions: {
    updateRange ({ state, rootState, dispatch, commit }, range) {
      let payload = {
        token: rootState.user.token,
        fromTime: range.fromTime,
        toTime: range.toTime
      }

      commit('setFromTime', range.fromTime)
      commit('setToTime', range.toTime)

      dispatch('getBandwidthData', payload)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
    },

    getBandwidthData ({ commit }, payload) {
      /*
      Provided a payload with user's session_token, from
      */

      return new Promise((resolve, reject) => {
        DataAPI.getBandwidth(
          payload,
          function success (res) {
            commit('setData', res.data)
            resolve(res.data)
          },
          function failure (err) {
            reject(err.response)
          })
      })
    }
  }
}
