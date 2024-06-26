import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/Layout/components/CartList.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'


const router = createRouter({
  // 指明应用程序在import.meta.env.BASE_URL下，即根路径下
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      // 不能加s
      component:Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          // :为占位符
          path:'category/:id',
          component:Category
        },
        {
          path:'category/sub/:id',
          component:SubCategory
        },
        {
          path:'/detail/:id',
          component:Detail
        },
        {
          path:'/cartlist',
          component:CartList
        },
        {
          path:'checkout',
          component:Checkout
        },
        {
          path:'pay',
          component:Pay
        },
        {
          path:'paycallback',
          component:PayBack
        },
        {
          path:'/member',
          component:Member,
          children:[
            {
              path:'user',
              component:UserInfo
            },
            {
              path:'order',
              component:UserOrder
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component:Login,
    }
  ],
  //切换路由时，控制页面位置
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
