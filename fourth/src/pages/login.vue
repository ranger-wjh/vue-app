<template>
  <div>
    <van-nav-bar title="登录"  />
    <van-cell-group>
      <van-field v-model="username" clearable label="用户名" placeholder="请输入用户名" />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="primary" size="large" @click="login">登录</van-button>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if(this.username == '' || this.password==''){
          //登录失败
            Toast.fail('用户名或密码不能为空')
            return false;
      }
      this.$http
        .post("/api/memberlogin", {
          username: this.username,
          password: this.password
        })
        .then(res => {
            console.log(res)
          //登录成功  保存id到本地
          if (res.data.status == 1) {
            localStorage.setItem("id", res.data.data._id);
            //重新返回跳转进的页面
            this.$router.push(localStorage.getItem('shop'))
          }else{
            //登录失败
            Toast.fail('用户名或密码错误')
          }
        });
    }
  },
  //路由守卫
  beforeRouteEnter (to, from, next) {
    //记录跳转进登录页的路由
    localStorage.setItem('shop',from.fullPath)
    next()
  }
};
</script>

<style scoped>
</style>