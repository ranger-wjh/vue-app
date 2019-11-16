<template>
    <div class="list">
        <div class="left">
            <ul>
                <li v-for="(item,index) in categoryList" 
                :key="item._id" 
                :class="{'active': index == ind}"
                @click = 'change(index)'
                >{{item.title}}</li>
            </ul>
        </div>
        <div class="right">
            <ul>
                <li v-for="(item) in categoryImg" :key="item._id"  @click="shopinfo(item._id)">
                    <img  :src="'http://localhost:3000'+item.imgurl">            
                </li>
            </ul>
           
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //商品分类
                categoryList:[],
                //商品图片
                categoryImg:[],
                ind:0,
                data:null
            }
        },
        
        created(){
            //获取商品分类列表
            this.$http.get('/api/catelist').then(res=>{
                this.categoryList = res.data.data
            })
            //获取商品图片列表
            this.$http.get('/api/categoods').then(res=>{
                this.data = res.data.data
                this.categoryImg = res.data.data[0].children
            })
        },
        methods: {
            change(i) {
                //1.控制左侧高亮
                this.ind = i;
                //2.控制右侧商品显示
                this.categoryImg = this.data[i].children
            },
            //商品详细信息  将商品id传过去
            shopinfo(id){
                this.$router.push('/shopinfo/?id=' + id)
            }
        },
    }
</script>

<style lang="less" scoped>
   .list{
       width: 100%;
       height: 100%;
       display: flex;
        .left{
            width: 100px;
            border-right:1px solid yellow;
        }
        .right{
            flex: 1;
            padding-left: 20px;
            ul{
              display: flex;
              justify-content: space-between;
                li{
                    width: 45%;
                    img{
                        width: 100%;
                        height:100%;
                    }
                }
            }
            
        }
   }
    .active{
        color: blue
    }
</style>