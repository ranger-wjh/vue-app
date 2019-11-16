<template>
  <div>
        <el-form label-width="80px" >
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            formLabelAlign: {
                name: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            this.$http.post("/api/login", {
                username: this.formLabelAlign.name,
                password: this.formLabelAlign.password
            }).then(res => {
                console.log(res)
                if (res.data.status ==1){
                    localStorage.setItem("uname", res.data.data.username)
                    this.$router.push('/admin/adminuser')
                }
            })
        }
    },
};
</script>

<style scoped>
</style>