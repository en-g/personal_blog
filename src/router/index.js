import Vue from 'vue'
import VueRouter from 'vue-router'

import { routesRule } from './config'

Vue.use(VueRouter)

const routes = routesRule

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(() => {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
})

export default router
