<template>
    <div>
    <v-snackbar
    :value ="notificationData.isNotificationShown"
    :timeout ="notificationData.timeout"
    top
    right
    color="rgba(18, 17, 17, 0.9)"
    multi-line
    >
        <v-img :src="notificationData.notificationIcon" max-height="50" max-width = "50"></v-img>
        <v-col class="mr-1">
            <v-row>
                {{ notificationData.notificationTitle}}
            </v-row>
            <v-row>
                {{ notificationData.notificationBody }}
            </v-row>
        </v-col>
        
        <v-btn
        @click="closeSnackbar"
        color="rgb(0,0,0,0)"
        icon
        depressed
        >
        <v-icon color="white">mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
    </div>
</template>

<script>
    export default {
        name: "NotificationPopup",
        methods: {
            closeSnackbar() {
                const resetNotificationData = {
                    notificationState: false,
                    notificationTitle: '',
                    notificationBody: '',
                    notificationIcon: '/s11.png',
                    timeout: 0
                }
                this.$store.dispatch("notification/setNotification", resetNotificationData)
            }
        },
        computed: {
            notificationData(){
                return this.$store.state.notification.notificationData
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>