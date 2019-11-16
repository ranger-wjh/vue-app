<template>
    <div>
      <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" width="50" label="编号"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="edit(scope.$index)">编辑</el-button>
                </template>
            </el-table-column>
       </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData :[]
            }
        },
        created(){
            this.$http.get('/api/memberlist').then(res=>{
                this.tableData = res.data.data
            })
        },
        methods: {
            edit(i) {
                let id = this.tableData[i]._id
                console.log(id)
                this.$router.push('/admin/vipChange?id=' + id)
            }
        },
    }
</script>

<style  scoped>

</style>