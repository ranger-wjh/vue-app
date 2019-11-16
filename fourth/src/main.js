// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

Vue.use(Vant);
Vue.prototype.$http = axios
Vue.config.productionTip = false

var arr = ['/index/cart', '/index/my']
var reg = /^\/admin/  //以admin开头的路由
router.beforeEach((to, from, next) => {
    if (arr.indexOf(to.path) != -1) {
        if (localStorage.getItem('id')) {
          next()
        } else {
          next('/login')
        }
    } else {
      if (reg.test(to.path)) {
        // 说明访问pc端
        if (localStorage.getItem('uname')) {
          next()
        } else {
          next('/adLogin')
        }
      } else {
        next()
      }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
