<template>
  <v-content
    v-if="currentArtistGetter"
    :style="{
      backgroundImage: 'url(' + currentArtistGetter.imageUrl + ')',
      backgroundSize: '60% Auto',
      backgroundPosition: 'center top',
      backgroundRepeat: 'repeat'
    }"
  >
    <div
      :class="{
        'gradient-body': true,
        'pl-10': true,
        'pt-12': true,
        'py-7': true,
        'md-and-up-margin': $vuetify.breakpoint.mdAndUp,
        'sm-and-down-margin': $vuetify.breakpoint.smAndDown
      }"
    >
      <p class="caption white--text">
        {{ currentArtistGetter.followersCount }} Followers
      </p>
      <h1 class="display-3 font-weight-bold white--text my-5">
        {{ currentArtistGetter.name }}
      </h1>
      <v-row>
        <v-menu bottom dark offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="success"
              min-width="110"
              min-height="40"
              dark
              v-on="on"
              rounded
            >
              Share
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in shareList"
              :key="i"
              @click="share(item.name)"
            >
              <v-btn :title="item.name" icon
                ><v-icon>{{ item.icon }}</v-icon></v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <template v-if="isVisitor">
          <v-btn
            rounded
            outlined
            color="success"
            min-width="160"
            min-height="40"
            dark
            class="mx-3"
            v-if="!isFollowed || !isFollowed[0]"
            @click="follow()"
            success
            >Follow</v-btn
          >
          <v-btn
            rounded
            outlined
            color="error"
            min-width="160"
            min-height="40"
            dark
            class="mx-3"
            v-else
            @click="unfollow()"
            alert
            >Unfollow</v-btn
          >
        </template>
      </v-row>
    </div>
    <div class="pl-3 content-container">
      <div class="pl-9 mb-10">
        <v-row>
          <v-btn text color="white" class="mx-2" :to="{ name: 'Overview' }">
            <span class="text-capitalize white--text">Overview</span>
          </v-btn>

          <v-btn
            text
            color="white"
            class="ml-2 mr-0"
            :to="{ name: 'RelatedArtists' }"
          >
            <span class="text-capitalize white--text">Related Artists</span>
          </v-btn>
        </v-row>
      </div>

      <router-view
        :artistID="artistID"
        :artistName="currentArtistGetter.name"
        :contextMenu="contextMenu"
      />
    </div>
  </v-content>
</template>

<script>
/**
 * @displayName Artist Interface
 * @example [none]
 */
import getuserToken from "../../mixins/userService/getUserToken";
import getuserID from "../../mixins/userService/getuserID";
import isLoggedIn from "../../mixins/userService/isLoggedIn";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["contextMenu"],
  methods: {
    ...mapActions("artist", [
      "getCurrentArtist",
      "isFollowingArtists",
      "followArtist",
      "unfollowArtist"
    ]),
    /**
     * Function to share artist interface on user' facebook, twitter or copy interface url
     * @public This is a public method
     * @param {String} type the type of share, twitter or facebook or copy to clipboard
     */

    share(type) {
      var url = `${window.location.host}/webhome/artist/${this.artistID}`;
      if (type == "Facebook")
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=" +
            url +
            "&amp;src=sdkpreparse"
        );
      else if (type == "Twitter")
        window.open("https://twitter.com/intent/tweet?url=" + url);
      else {
        var el = document.createElement("textarea");
        // Set value (string to be copied)
        el.value = url;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute("readonly", "");
        el.style = { position: "absolute", left: "-9999px" };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand("copy");
        // Remove temporary element
        document.body.removeChild(el);
      }
    },
    /**
     * Function updates the user interface info
     * @public This is a public method
     * @param {none}
     */

    updateArtist() {
      this.getCurrentArtist({
        token: this.getuserToken(),
        id: this.artistID
      });
      this.isFollowingArtists({
        token: this.getuserToken(),
        artists: [this.artistID]
      });
    },
    /**
     * Function to follow the artist
     * @public This is a public method
     * @param {none}
     */
    follow() {
      this.followArtist({
        token: this.getuserToken(),
        artists: [this.artistID],
        type: "artist"
      });
    },

    /**
     * Function to unfollow the artist
     * @public This is a public method
     * @param {none}
     */

    unfollow() {
      this.unfollowArtist({
        token: this.getuserToken(),
        artists: [this.artistID],
        type: "artist"
      });
    }
  },
  created() {
    this.updateArtist();
  },
  computed: {
    ...mapGetters("artist", ["currentArtistGetter", "isFollowed"]),

    /**
     * Function to get the artist id
     * @public This is a public method
     * @param {none}
     */

    artistID() {
      return this.$route.params.id;
    },

    /**
     * Function to know if the current user isn't the artist of this interface
     * @public This is a public method
     * @param {none}
     */

    isVisitor() {
      return this.isLoggedIn() && this.artistID != this.getuserID();
    }
  },
  watch: {
    artistID: function() {
      this.updateArtist();
    }
  },
  data: function() {
    return {
      shareList: [
        {
          name: "Facebook",
          icon: "mdi-facebook"
        },
        {
          name: "Twitter",
          icon: "mdi-twitter"
        },
        {
          name: "Copy Url",
          icon: "mdi-content-copy"
        }
      ]
    };
  },
  mixins: [getuserToken, getuserID, isLoggedIn]
};
</script>

<style>
.gradient-body {
  background: rgb(26, 26, 26);
  background: linear-gradient(
    0deg,
    rgba(26, 26, 26, 1) 0%,
    rgba(26, 26, 26, 0) 100%
  );
}
.md-and-up-margin {
  margin-top: 20%;
}
.sm-and-down {
  margin-top: 8%;
}
.content-container {
  background: #1a1a1a;
  height: 100%;
}
</style>
