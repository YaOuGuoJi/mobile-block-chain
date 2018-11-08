import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/page/index/Home'
import Find from '@/page/index/Find'
import Play from '@/page/index/Play'
import My from '@/page/index/My'
import Ore from '@/page/Ore'
import Login from '@/page/Login'


Vue.use(Router);

export default new Router({
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
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/ore',
      name: 'Ore',
      component: Ore
    }
  ]
})
