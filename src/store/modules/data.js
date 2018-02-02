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
    bandwidthData: {},
    audienceData: {}
  },
  mutations: {
    setBandwidth (state, data) {
      state.bandwidthData = data
    },
    setAudience (state, data) {
      state.audienceData = data
    },

    // Both of these take time in milliseconds since epoch
    setFromTime (state, time) {
      state.fromTime = time
    },
    setToTime (state, time) {
      state.toTime = time
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
      dispatch('getAudienceData', payload)
    },

    getBandwidthData ({ commit }, payload) {
      /*
      Provided a payload with user's session_token, from
      */

      DataAPI.getBandwidth(
        payload,
        function success (res) {
          commit('setBandwidth', res.data)
        },
        function failure (err) {
          // FUTURE: Error handling
          console.error(err.response)
        })
    },

    getAudienceData ({ commit }, payload) {
      /*
      Provided a payload with user's session_token, from
      */

      DataAPI.getAudience(
        payload,
        function success (res) {
          commit('setAudience', res.data)
        },
        function failure (err) {
          // FUTURE: Error handling
          console.error(err.response)
        })
    }
  }
}
