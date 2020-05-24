<template>
  <div class="col-sm-9">
    <div class="content">
      <div class="header-container">
        <h1>Recover playlists</h1>
      </div>
      <p class="p" v-show="PlaylistsRecover">
        Accidentally deleted a playlist? No worries, find the deleted playlist
        you'd like to recover below then click RESTORE to recover it.
      </p>
      <p class="alert-info" v-show="PlaylistNoRecover">
        You haven't deleted any playlists
      </p>
      <p class="alert-danger" v-show="NoPlaylists">
        Sorry please try this later in another time or reload the page
      </p>
      <section class="section" v-show="PlaylistsRecover">
        <div class="table-responsive hidden-xs-only">
          <table class="table">
            <thead>
              <tr>
                <th class="table-header">Deleted</th>
                <th class="table-header">Title</th>
                <th class="table-header">Songs</th>
                <th class="table-header">Restore</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(playlist, index) in playlists"
                :key="(playlist, index)"
              >
                <td class="table-data">{{ playlist.date }}</td>
                <td class="table-data">{{ playlist.title }}</td>
                <td class="table-data">{{ playlist.songs }}</td>
                <td class="table-data">
                  <button v-show="!playlist.restored" @click="restore(index)">
                    Restore</button
                  ><b class="restored" v-show="playlist.restored">Restored</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
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
      NoPlaylists: true,
      PlaylistNoRecover: false,
      PlaylistsRecover: false
    };
  },
  components: {
    "bottom-content": BottomContent
  },
  methods: {
    restore: function(index) {
      this.playlists[index].restored = true;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./style/recoverPlaylist.sass"
</style>
