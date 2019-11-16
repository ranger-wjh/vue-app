<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" label="账号"></el-table-column>
      <el-table-column prop="title" label="商品名" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="30%">
      <masks :type="type" :cateId="cateId" @hide="hide" @getList="getList"></masks>
    </el-dialog>
  </div>
</template>

<script>
import masks from "../../components/class/masks";
export default {
  created() {
    this.getList()
  },
  components: {
    masks
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      type: "",
      cateId: ""
    };
  },
  methods: {
    hide() {
      this.dialogVisible = false;
    },
    //编辑商品
    edit(row) {
      //显示弹框
      this.dialogVisible = true;
      //将当前商品的id发送给弹框
      this.cateId = row._id;

      this.type = "编辑";
    },
    //删除商品
    del(row,index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //请求删除商品分类
          this.$http
            .post("/api/catedel", {
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
    //添加商品
    add() {
      this.type = "添加";
      this.dialogVisible = true;
    },
    getList() {
      //获取商品分类
      this.$http.get("/api/catelist").then(res => {
        if (res.data.status == 1) {
          this.tableData = res.data.data;
        }
      });
    }
  }
};
</script>

<style  scoped>
</style>