<template>
    <div>
        <v-container fluid>
            <v-app-bar app absolute color="black" flat></v-app-bar>
                <router-view></router-view>
        </v-container>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "../components/Homepage/TheHomepageFooter";

    export default {
        components: {
            Footer,
        },
    }
</script>

<style scoped>

</style>