<template>
  <div>
    <div class="header" >
      <van-nav-bar title="标题" left-arrow @click-left="back"/>
    </div>
    <div class="main">
      <div>
        <img :src="'http://localhost:3000' + shopinfo.imgurl" />
      </div>
      <div class="info">
        <p>{{shopinfo.title}}</p>
        <p>{{shopinfo.price}}</p>
      </div>
      <div class="tab">
        <van-tabs v-model="active">
          <van-tab title="商品详情">商品详情</van-tab>
          <van-tab title="买家口碑">买家口碑</van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="footer">
      <van-goods-action>
        <span>总价:¥{{shopinfo.price}}</span>
        <van-goods-action-button type="warning" text="加入购物车" @click="showprops"/>
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <div class="addcart">
      <div class="cartHeader">
      </div>
    </div>
    <!-- 弹出层 -->
    <props :show="show"  :shopinfo="shopinfo"    @hide="hide"></props>
  </div>
</template>

<script>
import props from '../components/shopinfo/props'
export default {
  components:{
    props
  },
  data() {
    return {
      shopinfo: '',
      active: 2,
      show:false
    };
  },
  created() {
      //商品id
      let id = this.$route.query.id
      //商品详情
      this.$http.get("/api/goodsinfo?id=" + id).then(res => {
          this.shopinfo = res.data.data
      }); 
      
  },
  methods: {
    //返回分类
    back() {
      //如果是登录状态就返回商品分类列表
      if(localStorage.getItem('id')){
        this.$router.push('/index/category')
        return false;
      }
      //否则返回上一级
      this.$router.back()    
    },
    //加入购物车
    showprops(){
      this.show = true
    },
    hide(bol){
      this.show = bol 
    }
  },
};
</script>

<style scoped>

</style>