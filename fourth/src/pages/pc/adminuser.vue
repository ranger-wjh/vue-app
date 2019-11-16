<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" label="账号"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="30%">
      <masks :detail="detail._id" @hide="hide" :type="type" @getList="getList"></masks>
    </el-dialog>
  </div>
</template>

<script>
import masks from "../../components/adminuser/masks.vue";
export default {
  components: {
    masks
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      detail: "",
      type: ""
    };
  },
  methods: {
    //添加用户
    add() {
      this.type = "添加";
      this.dialogVisible = true;
    },
    //编辑用户
    edit(row) {
      //1.显示弹框
      this.dialogVisible = true;
      //2.将用户信息发送到弹框
      this.detail = row;
      this.type = "编辑";
    },
    //隐藏弹框
    hide() {
      this.dialogVisible = false;
    },
    //删除用户
    del(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //请求删除用户接口
          this.$http
            .post("/api/userdel", {
              id: row._id
            })
            .then(res => {
              this.tableData.splice(index, 1);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getList() {
      this.$http.get("/api/userlist").then(res => {
        this.tableData = res.data.data;
      });
    }
  },
   created() {
    this.getList()
  }
};
</script>

<style  scoped>
</style>