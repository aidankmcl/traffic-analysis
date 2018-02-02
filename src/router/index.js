import Vue from 'vue'
import Router from 'vue-router'

import Store from '@/store'

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
        if (Store.state.user.token === '') return next('/login')
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
