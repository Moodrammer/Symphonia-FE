<template>
  <v-content class="pa-0">
    <!--Display popular songs -->
    <template v-if="allArtistTopTracks && allArtistTopTracks.length > 0">
    <v-card-title class="display-3 white--text">Popular</v-card-title>
    <v-row>
      <v-col class="mx-auto" lg="11" sm="12" md="12">
        <!--this divider will be shown at the small screen sizes only-->
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <v-list class="mx-auto mt-3" dark>
          <!--Nesting the song component-->
          <div>
            <SongItem
              v-for="track in allArtistTopTracks"
              :key="track.name"
              :songName="track.name"
              :albumName="track.album.name"
              :albumID="track.album._id"
              :artistName="artistName"
              :artistID="artistID"
              :songDuration="track.durationMs"
              :ID="track._id"
              :isDisabled="track.premium"
              :image="track.album.image"
              :contextMenu="contextMenu"

            />
          </div>
        </v-list>
      </v-col>
    </v-row>
  </template>
    <!--Display albums -->
    <v-card-title
      class="mt-4 display-3 white--text"
      v-show="albumsCardItems.items.length > 0"
    >
      Albums
    </v-card-title>
    <v-row>
      <v-col class="mx-auto" lg="11" sm="12" md="12">
        <!--this divider will be shown at the small screen sizes only-->
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <CardGrid
          :cardItems="albumsCardItems"
          :contextMenu="contextMenu"
          cardStyle="artistUICard"
          name="albums"
        />
      </v-col>
    </v-row>

    <!--Display singles -->
    <v-card-title
      class="mt-4 display-3 white--text"
      v-show="singlesCardItems.items.length > 0"
    >
      Singles
    </v-card-title>
    <v-row>
      <v-col class="mx-auto" lg="11" sm="12" md="12">
        <!--this divider will be shown at the small screen sizes only-->
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <CardGrid
          :cardItems="singlesCardItems"
          :contextMenu="contextMenu"
          cardStyle="artistUICard"
          name="singles"
        />
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import getuserToken from "../../mixins/userService/getUserToken";
import SongItem from "../general/SongItem";
import CardGrid from "../general/CardGrid";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    SongItem,
    CardGrid
  },
  mixins: [getuserToken],
  created() {
    this.getArtistTopTracks({
      id: this.$props.artistID,
      token: this.getuserToken(),
      limit: 5,
      offset: 0
    });

    this.getArtistAlbums({
      id: this.$props.artistID,
      token: this.getuserToken()
    });

<<<<<<< HEAD
=======
    this.getArtistSingles({
      id: this.$props.artistID,
      token: this.getuserToken()
    });
>>>>>>> master
  },
  methods: {
    ...mapActions("artist", [
      "getArtistAlbums",
      "getArtistTopTracks",
<<<<<<< HEAD
=======
      "getArtistSingles",
      "getArtistAppearsOn"
>>>>>>> master
    ]),
    menuOrder() {}
  },
  computed: {
    ...mapGetters("artist", [
      "allArtistAlbums",
      "allArtistTopTracks",
      "allArtistSingles",
<<<<<<< HEAD
    ]),
=======
      "allArtistAppearsOn"
    ])
>>>>>>> master
  },
  props: ["artistID", "artistName", "contextMenu"],
  data() {
    return {
      albumsCardItems: {
        items: []
      },
      singlesCardItems: {
        items: []
      },
<<<<<<< HEAD
=======
      tracks: [
        {
          durationMs: 323213232,
          name: "saad",
          album: {
            name: "sa",
            _id: "dsa"
          },
          artist: {
            name: "dsadsa",
            _id: "dsadssadsa"
          }
        }
      ]
>>>>>>> master
    };
  },
  watch: {
    allArtistAlbums(newValue) {
      console.log("sdasd1", newValue);
      this.albumsCardItems.items = newValue;
<<<<<<< HEAD
    },
    allArtistSingles(newValue) {
      console.log("sdasd2", newValue);
      this.singlesCardItems.items = newValue;
    },
  },
=======
      newValue.forEach(element => {
        if (element.type == "album") albums.push(element);
        else singles.push(element);
      });
      console.log("saaaaaaaad", newValue);
      this.albumsCardItems.items = albums;
      this.singlesCardItems.items = singles;
    }
  }
>>>>>>> master
};
</script>

<style></style>
