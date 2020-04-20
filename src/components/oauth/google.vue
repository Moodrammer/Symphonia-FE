<template>
    <div>

    </div>
</template>

<script>
    export default {
        created() { 
            console.log(this.$route.params.userToken)
            sessionStorage.setItem("userToken", this.$route.params.userToken)
            this.$router.push("/webhome/home");
        }
    }
</script>

<style lang="scss" scoped>

</style>