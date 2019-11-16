<template>
    <div>
        <router-link v-show="flag" to='/login' tag='button'>登录</router-link>
        <router-link v-show="flag" to='/register' tag='button'>注册</router-link>
        <router-link v-show='flag2' to='/zhiuxiao'></router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                flag: true,
                flag2:false
            }
        },
        created(){
            if(localStorage.getItem('id')){
                this.flag = false
                this.flag2 = true
            }else{
                this.flag = true
                this.flag2 = false
            }
        }
    }
</script>

<style scoped>

</style>