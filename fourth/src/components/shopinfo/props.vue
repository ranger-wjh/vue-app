<template>
  <div>
    <van-popup class="cart" @close="close" v-model="myshow" position="bottom" :style="{ height: '55%' }">
      <div class="header">
        <img :src="'http://localhost:3000' + shopinfo.imgurl" />
        <div class="price">
          <p>{{shopinfo.price}}</p>
          <p>库存199件</p>
        </div>
      </div>
      <div class="count">
        <span>购买数量</span>
        <div class="btns">
          <button @click="subcount">-</button>
          <span>{{count}}</span>
          <button @click="addcount">+</button>
        </div>
      </div>
      <div class="color">
        <h4>颜色</h4>
        <ul>
          <li 
          v-for="(item,index) in color" 
          :key="index"
          :class="{'active' : item == colorTitle}"      
          @click="changecolor(item)"
          >{{item}}</li>
         
        </ul>
      </div>
      <div class="size">
        <h4>内存</h4>
        <ul>
           <li 
           v-for="(item,index) in size" 
           :key="index"
            :class="{'active' : item == sizeTitle}"      
            @click="changesize(item)"
           >{{item}}</li>
        </ul>
      </div>
      <van-goods-action>
        <span>总价:¥{{this.count * shopinfo.price}}</span>
        <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data() {
    return {
      myshow: this.show,
      count:1,
      color:["红色","黑色","白色","金色"],
      size:["16G","32G"],
      colorTitle:'',
      sizeTitle:''
    };
  },
  props: ["show" ,"shopinfo"],
  watch: {
    //点击加入购物车监听show
    show() {
      this.myshow = true;
    }
  },
  methods: {
    //关闭弹出层并将父元素shopinfo中的show置为false
    close() {
      this.$emit("hide", false);
    },
    subcount(){
        if(this.count == 1){
            return
        }
        this.count--
    },
    addcount(){
        this.count++
    },
    changecolor(color){
        this.colorTitle = color
    },
    changesize(size){
        this.sizeTitle = size
    },
    //加入购物车
    addCart(){
        //选中规格才能加入
        if(!this.colorTitle || !this.sizeTitle){
            Toast.fail('必须选择商品规格')
        }
        let userid = localStorage.getItem('id')
        let goodsid = this.shopinfo._id
        let goodsnum = this.count
        //判断是否登录
        if(userid){
          //购物车商品添加   参数:用户ID 商品ID  商品数量 
          this.$http.post('/api/cartadd',{
            userid:userid,
            goodsid:goodsid,
            goodsnum:goodsnum
          }).then(res=>{
            //添加商品成功
            this.$router.push('/index/cart')
          })
        }else{
          //如果未登录 就跳转至登录页
          this.$router.push('/login')
        }
    }
  }
};
</script>

<style lang="less"  scoped>
.cart{
    padding: 10px;
    box-sizing: border-box
}
.header{
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    img{
        width: 100px;
        margin-right: 20px;
    }
}
.count{
    display: flex;
    justify-content: space-between;
}
.color{
    ul{
        display: flex;
        justify-content: space-between;
        li{
            padding: 10px 20px;
            background: #ccc;
            &.active{
                border: 1px solid red;
            }
        }
    }
}
.size{
    ul{
        display: flex;
        li{
            padding: 10px 20px;
            background: #ccc;
            margin-right: 20px;
             &.active{
                border: 1px solid red;
            }
        }
    }
}
.van-goods-action{
    bottom: 10px;   
}
</style>