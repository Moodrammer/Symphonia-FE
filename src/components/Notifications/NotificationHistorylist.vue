<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="rgba(13, 12, 12, 0.94)" v-on="on" icon class="mx-2">
          <v-icon color="white">mdi-bell</v-icon>
        </v-btn>
      </template>
      <v-list
        max-height="400"
        max-width="500"
        dark
        dense
        tile
        avatar="true"
        three-line
        class="overflow-y-auto tileStyle"
      >
        <v-list-item v-if="noNotificationHistory">
          <v-list-item-avatar class="ml-2">
            <v-img src="/s11.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <div>you currently have no notification history</div>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(notification, index) in notifications"
          :key="index"
        >
          <v-list-item-avatar class="ml-2">
            <v-img :src="notification.icon"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <strong v-html="notification.title"></strong>
            </v-list-item-title>
            <v-list-item-subtitle v-html="notification.body"
              ></v-list-item-subtitle
            >
            <p style="font-size: 10px;">{{ notification.date }}</p>
            <v-divider></v-divider>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn 
            rounded
            :to="notification.pushUrl"
            >
              view
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "NotificationHistorylist",
  created() {
    this.$store.dispatch("notification/getNotificationHistoryList");
  },
  computed: {
    notifications() {
      var list = this.$store.state.notification.historyList;
      if (!list.length)
        this.$store.commit("notification/setnoNotificationHistory", true);
      else {
        this.$store.commit("notification/setnoNotificationHistory", false);
      }
      return list;
    },
    noNotificationHistory() {
      return this.$store.state.notification.noNotificationHistory;
    }
  }
};
</script>

<style scoped>
.tileStyle {
  background-color: rgba(20, 20, 20, 0.836);
}
</style>
