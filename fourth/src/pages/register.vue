<template>
  <div>
    <van-nav-bar title="注册"   />
    <van-cell-group>
      <van-field
        v-model="username"
        clearable
        label="用户名"
        placeholder="请输入用户名"
    
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="primary" size="large" @click="reg">注册</van-button>
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
    //注册账号 请求接口
    reg() {
        if(!this.username || !this.password){
            Toast.fail('用户名或密码不能为空')
            return false
        }
      this.$http
        .post("/api/memberadd", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          //注册成功
          Toast.success('注册成功')
          this.$router.push("/login")
        });
    }
  }
};
</script>

<style  scoped>
</style>