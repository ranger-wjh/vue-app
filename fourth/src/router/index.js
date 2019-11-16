import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import home from '../pages/home'
import category from '../pages/category'
import cart from '../pages/cart'
import my from '../pages/my'
import shopinfo from '../pages/shopinfo'
import login from '../pages/login'
import register from '../pages/register'
import zhuxiao from '../pages/zhuxiao'

//pc端路由
import admin from '../pages/pc/index'
import adminuser from '../pages/pc/adminuser'
import vip from '../pages/pc/vip'
import classs from '../pages/pc/class'
import goods from '../pages/pc/goods'
import banners from '../pages/pc/banners'
import goodsChange from '../pages/pc/goodsChange'
import vipChange from '../pages/pc/vipChange'
import adminLogin from '../pages/pc/adminLogin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:"/index",
      redirect:'/index/home',
      component:index,
      children:[
        {
          path:"home",
          component:home
        },
        {
          path:"category",
          component:category
        },
        {
          path:"cart",
          component:cart,
          beforeEnter(to,from,next){
            if(localStorage.getItem('id')){
              next()
            }else{
              next('/login')
            }
          }
        },
        {
          path:"my",
          component:my,
          beforeEnter(to,from,next){
            if(localStorage.getItem('id')){
              next('/zhuxiao')
            }else{
              next()
            }
          }
        }
      ]
    },
    {
      //商品详细信息
      path:"/shopinfo",
      component:shopinfo
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/register',
      component:register
    },
    {
      path:'/zhuxiao',
      component:zhuxiao,
      beforeEnter(to,from,next){
        if(localStorage.getItem('id')){
          next()
        }else{
          next('/login')
        }
      }
    },
    //pc端路由
    {
      path:'/admin',
      component:admin,
      children:[
        {
          path:'adminuser',
          component:adminuser
        },
        {
          path:'vip',
          component:vip
        },
        {
          path:'class',
          component:classs
        },
        {
          path:'goods',
          component:goods
        },
        {
          path:'banners',
          component:banners
        },
        //商品添加及修改
        {
          path:'goodsChange',
          component:goodsChange
        },
        //用户修改
        {
          path:'vipChange',
          component:vipChange
        },
      ]
    },
    //用户登录
    {
      path:'/adLogin',
      component:adminLogin
    }
  ]
})
