<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户账号">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" @click = "sure">确定</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}
        }
    },
    created(){
        //请求获取用户信息 一条接口
        let id = this.$route.query.id
        this.$http.get('/api/memberinfo?id=' + id).then(res=>{
            if(res.data.status == 1){
                this.form = res.data.data
            }
        })
    },
    methods: {
        sure() {
             //修改用户信息接口
             this.$http.post('/api/memberedit',{
                 id:this.form._id,
                 username:this.form.username,
                 password:this.form.password
             }).then(res=>{
                 console.log(res)
                 this.$router.push('/admin/vip')
             })   
        },
        reset(){
            //清空填写的内容
            this.form.username = this.form.password = ''
        }
    },
};
</script>

<style scoped>
</style>