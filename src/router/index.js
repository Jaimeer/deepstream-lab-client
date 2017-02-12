import Vue from 'vue'
import Router from 'vue-router'
import DeepstreamDashboard from '../components/DeepstreamDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DeepstreamDashboard',
      component: DeepstreamDashboard
    }
  ]
})
