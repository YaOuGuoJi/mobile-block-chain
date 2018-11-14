import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/page/index/Home'
import Find from '@/page/index/Find'
import Play from '@/page/index/Play'
import My from '@/page/index/My'
import PowerRecord from '@/page/PowerRecord'

import Ore from '@/page/Ore'
import Login from '@/page/Login'
import Register from '@/page/Register'
import Order from '@/page/Order'
import PowerBase from '@/page/PowerBase'
import UserInfo from '@/page/UserInfo'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'Home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/find',
          name: 'Find',
          component: Find
        },
        {
          path: '/play',
          name: 'Play',
          component: Play
        },
        {
          path: '/my',
          name: 'My',
          component: My
        }
      ]
    },
    {
      path: '/ore',
      name: 'Ore',
      component: Ore
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
        },
    {
      path: "/power",
      name: 'powerRecord',
      component: PowerRecord
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/powerBase',
      name: 'PowerBase',
      component: PowerBase
    }
  ]
})
