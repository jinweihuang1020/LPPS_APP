import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ControlBoard from '../views/DeviceControl.vue'
import Query from '../views/Query.vue';
import Settings from '../views/Setting.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/ControlBoard',
    name: 'ControlBoard',
    component: ControlBoard
  },
  {
    path: '/Query',
    name: 'Query',
    component: Query
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
