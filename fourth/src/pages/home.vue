<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img  :src="'http://localhost:3000'+image.imgurl">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
    data(){
        return{
            images:[]
        }
    },
    //页面加载请求后台数据展示轮播图
    created(){
        this.$http.get('/api/bannerlist').then(res=>{
           this.images = res.data.data;
        })
    }
};
</script>

<style scoped>
</style>