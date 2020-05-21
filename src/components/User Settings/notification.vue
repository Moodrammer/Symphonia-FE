<template>
  <div class="col-sm-9">
    <div class="content">
      <div class="header-container">
        <h1>Notification settings</h1>
      </div>
      <div class="section">
        <form action="#" class="notification-form">
          <table class="table table-responsive">
            <thead>
              <tr>
                <th class="table-category">Symphonia Updates</th>
                <th><i class="fas fa-envelope svg"></i><span>Email</span></th>
                <th>
                  <i class="far fa-window-restore svg"></i><span>Push</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="form-group">
                <td>
                  Product News
                  <p class="description">
                    Getting started, new features and the latest product updates
                    on Symphonia
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  Symphonia News and Offers
                  <p class="description">
                    News, promos and events for you
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table table-responsive">
            <thead>
              <tr>
                <th class="table-category">Your Music</th>
                <th><span></span></th>
                <th>
                  <span></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="form-group">
                <td>
                  Recommended Music
                  <p class="description">
                    Music we find that we think you’ll like
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  New Music
                  <p class="description">
                    Fresh tracks from artists you follow or might like
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  Playlist Updates
                  <p class="description">
                    A playlist you follow is updated
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  Concert Notifications
                  <p class="description">
                    Updates about live shows by artists you like, in places near
                    you
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
              <tr class="form-group">
                <td>
                  Artist Updates
                  <p class="description">
                    Hear about artists you listen to and artists we think you’ll
                    like
                  </p>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
                <td class="td-checkbox">
                  <div class="checkbox">
                    <v-checkbox
                      class="checkbox-input"
                      color="green"
                    ></v-checkbox>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="button-col">
            <button>save profile</button>
            <a href="/" class="a-cancel">cancel</a>
          </div>
        </form>
      </div>
      <bottom-content></bottom-content>
    </div>
  </div>
</template>

<script>
import BottomContent from "./BottomContent.vue";
export default {
  data() {
    return {
      playlists: [
        {
          date: "3/18/20",
          title: "list",
          songs: 1,
          restored: false
        }
      ],
      count: -1
    };
  },
  components: {
    "bottom-content": BottomContent
  }
};
</script>

<style lang="sass" scoped>
@import "./style/notification.sass"
</style>
