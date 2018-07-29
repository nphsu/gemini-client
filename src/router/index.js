import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello', // 変更
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Currency',
      component: () => import('@/pages/PageCurrency')
    }
  ]
})
