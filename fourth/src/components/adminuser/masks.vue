<template>
  <div>
    <el-form ref="detail" :model="detail1" label-width="80px">
      <el-form-item label="编号" v-if="type !='添加' ">
        <el-input v-model="detail1._id"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="detail1.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="detail1.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sure">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  created() {
    //获取管理员信息一条
    if (this.detail) {
      this.$http.get("/api/userinfo?id=" + this.detail).then(res => {
        this.detail1 = res.data.data;
      });
    }
  },
  data() {
    return {
      detail1: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //确定修改
    sure() {
      if (this.type == "编辑") {
        //请求修改管理员接口
        this.$http.post("/api/useredit", {
            id: this.detail1._id,
            username: this.detail1.username,
            password: this.detail1.password 
          }).then(res => {
            //修改成功 隐藏窗口
            if (res.data.status == 1) {
              this.$emit("hide");
              this.$emit("getList")
            }
          });
      }else{
        this.$http.post('/api/useradd',{
          username:this.detail1.username,
          password:this.detail1.password
        }).then(res=>{
          //添加用户成功
          if(res.data.status == 1){
            this.$emit('hide')
            this.$emit("getList")
          }
        })
      }
    },
    //取消
    cancel() {
      this.$emit("hide");
    }
  },
  props: ["detail", "type"],
  watch: {
    type(newVal) {
      if (newVal == "添加") {
        this.detail1 = {
          username: "",
          password: ""
        };
      } else {
        this.$http.get("/api/userinfo?id=" + this.detail).then(res => {
          this.detail1 = res.data.data;
        });
      }
    }
  }
};
</script>

<style scoped>
</style>