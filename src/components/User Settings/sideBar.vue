<template>
  <div class="col-sm-3 hidden-xs-only" style=" padding: 0px;">
    <div class="sidebar">
      <img :src="image" class="user-img img-circle" />
      <ul class="nav-inverse nav-tabs nav-stacked" style="padding: 0px">
        <!-- the links to the user account options -->
        <!-- account overview router -->
        <li>
          <router-link to="/account/" exact id="account"
            ><i class="fas fa-home svg"></i>Account overview</router-link
          >
        </li>
        <!-- edit the account router -->
        <li>
          <router-link to="/account/edit" exact id="edit"
            ><i class="fas fa-pencil-alt svg"></i>Edit profile</router-link
          >
        </li>
        <!-- change the password router -->
        <li>
          <router-link to="/account/changePassword" exact id="pass"
            ><i class="fas fa-lock svg"></i>Change password</router-link
          >
        </li>
        <!-- Notification settings router -->
        <li>
          <router-link to="/account/notifications" exact id="notif"
            ><i class="fas fa-bell svg"></i>Notification settings</router-link
          >
        </li>
        <!-- Recover the playlists router -->
        <li>
          <router-link to="/account/recover-playlists" exact id="recover"
            ><i class="fas fa-redo svg"></i>Recover playlists</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: ""
    };
  },
  created() {
    // Request to get the current user's data
    this.$store
      .dispatch("userData")
      .then(() => {
        // If we got it set it into the data to display the user's info
        this.image = this.$store.state.user.userImage;
      })
      .catch();
  }
};
</script>

<style lang="sass" scoiped>
@import "./style/sideBar.sass"
</style>
