import Vue from 'vue'
import Router from 'vue-router'

import Visualization from '@/pages/Visualization'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Visualization',
      component: Visualization,
      beforeEnter: (to, from, next) => {
        // Add logic for redirecting to Login if no session_token is available in store.
        next()
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
