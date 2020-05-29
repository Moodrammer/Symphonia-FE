<template>
    <div>
    <v-snackbar
    :value ="notificationData.isNotificationShown"
    :timeout ="notificationData.timeout"
    top
    right
    >
    {{ notificationData.text }}
    <v-btn
    color="blue"
    text
    @click="closeSnackbar"
    >
    Close
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
                    notificationText: '',
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