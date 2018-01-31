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
    data: {}
  },
  mutations: {
    setData (state, data) {
      console.log(data)
      state.data = data
    },
    setFromTime (state, date) {
      return date.getTime()
    },
    setToTime (state, date) {
      return date.getTime()
    }
  },
  actions: {
    updateRange ({ state, rootState, dispatch }) {
      console.log('time time time', state.fromTime, state.toTime)
      let payload = {
        token: rootState.user.token,
        fromTime: state.fromTime,
        toTime: state.toTime
      }

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
