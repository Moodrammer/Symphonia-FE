<template>
    <div>
    <v-snackbar
    :value ="snackbar"
    :timeout ="timeout"
    top
    right
    :text = text
    >
    {{ text }}
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
        props: {
            snackbar: Boolean,
            text: String,
            timeout: Number
        },
        methods: {
            closeSnackbar() {
                this.$emit('closeNotification')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>