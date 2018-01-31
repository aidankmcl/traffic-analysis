/*
Create global Vuex Store instance to be provided to main App instance.
*/

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import User from './modules/user'
import Data from './modules/data'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user: User,
    data: Data
  }
})
