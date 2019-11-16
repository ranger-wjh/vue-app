<template>
  <div>
    <el-form ref="form"  label-width="80px">
      <el-form-item label="商品名">
        <el-input v-model="title"></el-input>
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
  data() {
    return {
      title: ""
    };
  },
  methods: {
    //确定修改
    sure() {
      let title = this.title;
      if (this.type == "添加") {
        // 调用接口商品添加
        this.$http.post("/api/cateadd", {
            title: title,
            status: 1
          }).then(res => {
            if (res.data.status == 1) {
              // 关闭弹框
              this.title = "";
              this.$emit("hide");
              this.$emit("getList");
            }
          });
      } else {
        //请求修改商品名称接口
        this.$http.post("/api/cateedit", {
            id: this.cateId,
            title: title,
            status: 2
          }).then(res => {
            if (res.data.status == 1) {
              this.$emit("hide");
              this.$emit("getList");
            }
          });
      }
    },
    //取消
    cancel() {
      this.$emit("hide");
    }
  },
  props: ["cateId", "type"],
  created() {
    // 如果有id就根据id获取一条商品信息
    if (this.cateId) {
      this.$http.get("/api/cateinfo?id=" + this.cateId).then(res => {

        if (res.data.status == 1) {
          this.title = res.data.data.title;
        }
      });
    }
  },
  watch: {
    type(newVal) {
      if (newVal == "编辑") {
        if (this.cateId) {
          this.$http.get("/api/cateinfo?id=" + this.cateId).then(res => {
            console.log(res);
            if (res.data.status == 1) {
              this.title = res.data.data.title;
            }
          });
        }
      } else {
        this.title = "";
      }
    },
    cateId() {
      this.$http.get("/api/cateinfo?id=" + this.cateId).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.title = res.data.data.title;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>