import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Add from '@/components/addPage'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ]
})
