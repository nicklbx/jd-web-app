import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/main',
    component: () => import( '../views/common/Index.vue'),
    children:[
        {
          path: '/main',
          name: 'main',
          component: () => import('../views/Main.vue')
        },
        {
          path: '/classify',
          name: 'classify',
          component: () => import('../views/Classify.vue')
        },
        {
          path: '/carts',
          name: 'carts',
          component: () => import('../views/Carts.vue')
        },
        {
          path: '/myself',
          name: 'myself',
          component: () => import('../views/Myself.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/Search.vue')
        },
        {
          path: '/list',
          name: 'list',
          component: () => import('../views/GoodsList.vue')
        },
        

    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
