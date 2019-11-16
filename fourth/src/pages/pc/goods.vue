<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="80" label="编号"></el-table-column>
      <el-table-column prop="cate" label="分类" width="100"></el-table-column>
      <el-table-column prop="title" label="名称" width="150"></el-table-column>
      <!-- 获取商品的图片 -->
      <el-table-column prop="imgurl" label="图片" width="180">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000' + scope.row.imgurl" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="desc" label="描述" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- echarts -->
    <div id="echarts" ref="echart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      //商品价格数组
      arrPrice: []
    };
  },
  methods: {
    //编辑商品
    edit(row) {
      this.$router.push("/admin/goodsChange?id=" + row._id);
    },
    //删除商品
    del(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //请求删除商品接口
          this.$http
            .post("/api/goodsdel", {
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
      this.$router.push("/admin/goodsChange");
    }
  },
  created() {
    //获取商品列表
    this.$http.get("/api/goodslist").then(res => {
      this.tableData = res.data.data;
    });

    this.$nextTick(() => {
      //请求商品列表接口
      this.$http.get("/api/goodslist").then(res => {
        let arr = [];
        res.data.data.forEach((item, index) => {
          arr.push(item.price);
        });
        //产品价格的数组
        this.arrPrice = arr;

        //实例化;echarts
        let priceEchart = this.$echarts.init(this.$refs.echart);

        //配置数据
        priceEchart.setOption({
          title: {
            text: "产品价格图",
            textAlign:"left"
          },
          legend: {
            data: ["价格"],
            top:30
          },
          xAxis: {
            data: [1, 2, 3]
          },
          yAxis: {},
          tooltip: {},
          series: [
            {
              name: "价格",
              type: "bar",
              data: this.arrPrice
            }
          ]
        });
      });
    });
  },
  mounted() {}
};
</script>

<style  scoped>
img {
  width: 50%;
}
#echarts {
  width: 500px;
  height: 500px;
}
</style>