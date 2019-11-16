<template>
  <div class="Cart">
    <van-nav-bar title="购物车"  @click-left="back"  left-text="返回"  left-arrow />

    <div class="cart">
      <ul>
        <li v-for="(item,index) in shopcart" :key="index">
          <input type="checkbox" v-model="item.checked"/>
          <img :src="'http://localhost:3000' + item.goods_img" alt />
          <div class="shf">
            <p>{{item.goods_title}}</p>
            <button @click="add(index,2)">-</button>
            <span>{{item.goods_num}}</span>
            <button @click="add(index,1)">+</button>
          </div>
          <span>¥{{item.goods_price}}</span>
          <span @click="delshop(index)">删除</span>
        </li>
      </ul>

      <div class="footer">
        <div class="choose">
          <input type="checkbox" v-model="checkAll"/>
          <label for>全选</label>
        </div>
        <div class="price">
            <span>合计: ¥{{sum}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopcart: [],
    };
  },
  
  created() {
    let id = localStorage.getItem("id");
    //请求购物车列表接口
    this.$http.get("/api/cartlist?userid=" + id).then(res => {
      this.shopcart = res.data.data;
    });
  },
  computed:{
      checkAll:{
          get(){
              return this.shopcart.every(item=>{
                  return item.checked
              })
          },
          set(newValue){
              //如果newVal为true则所有item.checked为true否则为false
              return this.shopcart.forEach(item=>{
                  return item.checked = newValue
              })
          }
      },
      sum(){
          let sum = 0;
          this.shopcart.forEach(item=>{
              if(item.checked){
                  sum+= item.goods_num * item.goods_price
              }
          })
          return sum;
      },
  },
  methods: {
    //点击返回商品列表
    back() {
      this.$router.go(-1)
    },
    //增加 减少
    add(i,type){
      let userid = this.shopcart[i].userid
      let goodsid = this.shopcart[i].goodsid
      this.$http.post('/api/cartedit',{
        userid:userid,
        goodsid:goodsid,
        type:type //1:加  2:减
      }).then(res=>{
        if(res.data.status ==1 ){
          if(type == 1){
            this.shopcart[i].goods_num++
          }else{
            if(this.shopcart[i].goods_num == 1){
              return 
            }else{
              this.shopcart[i].goods_num--
            }
          }
        }
      })
    },
    //删除购物车商品
    delshop(i){
      let id = this.shopcart[i]._id
      this.$http.post('/api/cartdel',{
        id:id
      }).then(res=>{
        //删除成功
        if(res.data.status == 1){
          //视觉删除购物车商品
          this.shopcart.splice(i,1)
        }
      })
    }
  },
};
</script>

<style lang="less"  scoped>
.Cart{
    width: 100%;
    height: 100%;
}
.cart {
  padding: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  ul {
    flex: 1;
    width: 100%;
    height: 1000px;
    overflow: auto;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
.footer{
    height: 50px;
    display: flex;
    justify-content: space-between;
}
</style>