<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="6">
            <v-row justify="center">
            <router-link to = '/'>
                <h1 
                display-4 
                class="black--text"
                >
                Symphonia
                </h1>
            </router-link>
            </v-row>
            </v-col>
        </v-row>
    </v-container>      
</template>

<script>
export default {
    name: "symphoniaHeader"
}
</script>

<style scoped>
    a{
    text-decoration: none;
    }
</style>