<template>
  <div>
    <div class="top">
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入用户名" />
      </van-cell-group>
    </div>
    <list></list>
  </div>
</template>

<script>
import list from '../components/category/list'
export default {
    data(){
        return {
            value:''
        }
    },
    components:{
        list
    }
};
</script>

<style scoped>
</style>