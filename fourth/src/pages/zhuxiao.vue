<template>
    <div>
        <p></p>
        <button @click="zhuxiao">注销账户</button>
    </div>
</template>

<script>
    export default {
        methods: {
            zhuxiao() {
                localStorage.removeItem('id')
                this.$router.push('/login')
            }
        },
    }
</script>

<style scoped>

</style>