<template>
    <div>
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <v-btn
            color="rgba(13, 12, 12, 0.94)"
            v-on="on"
            icon
            class="mx-2"
            >
            <v-icon color="white">mdi-bell</v-icon>
            </v-btn>
        </template>
        <v-list max-height="600" width="500" dark dense tile avatar="true" three-line class="overflow-y-auto tileStyle">
            <v-list-item v-for="(card,index) in cards" :key="index"> 
                <v-list-item-avatar class="ml-2">
                    <v-img src="/s11.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        <strong>title of test notification</strong>
                    </v-list-item-title>
                    <v-list-item-subtitle>test user started to follow you</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-menu>        
    </div>
</template>

<script>
    export default {
        name: "NotificationHistorylist",
        data() {
            return{
                cards:[
                {
                    title: "test1",
                    body: "body of test1"
                },
                {
                    title: "test2",
                    body: "body of test2"
                },
                {
                    title: "test1",
                    body: "body of test1"
                },
                {
                    title: "test1",
                    body: "body of test1"
                },
                {title:"test2", body:"test"},
                {title:"test2", body:"test"},
                {title:"test2", body:"test"},
                {title:"test2", body:"test"},
                {title:"test2", body:"test"},
                {title:"test2", body:"test"},
                ]
            }
        }
    }
</script>

<style scoped>
    .tileStyle{
        background-color: rgba(20, 20, 20, 0.836);
    }
</style>