<template>
  <v-content class="pa-0">
    <!--Display popular songs -->
    <v-card-title class="display-3 white--text">Popular</v-card-title>
    <v-row>
      <v-col class="mx-auto" lg="11" sm="12" md="12">
        <!--this divider will be shown at the small screen sizes only-->
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <v-list class="mx-auto mt-3" dark>
          <!--Nesting the song component-->
          <div v-if="tracks">
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
            />
          </div>
        </v-list>
      </v-col>
    </v-row>

    <!--Display albums -->
    <v-card-title
      class="mt-4 display-3 white--text"
      v-if="albumsCardItems.items.length > 0"
    >
      Albums
    </v-card-title>
    <v-row>
      <v-col class="mx-auto" lg="11" sm="12" md="12">
        <!--this divider will be shown at the small screen sizes only-->
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <CardGrid
          :cardItems="albumsCardItems"
          cardStyle="artistUICard"
          name="albums"
        />
      </v-col>
    </v-row>

    <!--Display singles -->
    <v-card-title
      class="mt-4 display-3 white--text"
      v-if="singlesCardItems.items.length > 0"
    >
      Singles
    </v-card-title>
    <v-row>
      <v-col class="mx-auto" lg="11" sm="12" md="12">
        <!--this divider will be shown at the small screen sizes only-->
        <v-divider class="hidden-lg-and-up" sm-12 color="#424242"></v-divider>
        <CardGrid
          :cardItems="singlesCardItems"
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

    this.getArtistSingles({
      id: this.$props.artistID,
      token: this.getuserToken()
    });
  },
  methods: {
    ...mapActions("artist", [
      "getArtistAlbums",
      "getArtistTopTracks",
      "getArtistSingles",
      "getArtistAppearsOn"
    ]),
    menuOrder() {}
  },
  computed: {
    ...mapGetters("artist", [
      "allArtistAlbums",
      "allArtistTopTracks",
      "allArtistSingles",
      "allArtistAppearsOn"
    ])
  },
  props: ["artistID", "artistName"],
  data() {
    return {
      albumsCardItems: {
        items: []
      },
      singlesCardItems: {
        items: []
      },
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
    };
  },
  watch: {
    allArtistAlbums(newValue) {
      var albums = [];
      var singles = [];
      this.albumsCardItems.items = newValue;
      newValue.forEach(element => {
        if (element.type == "album") albums.push(element);
        else singles.push(element);
      });
      console.log("saaaaaaaad", newValue);
      this.albumsCardItems.items = albums;
      this.singlesCardItems.items = singles;
    }
  }
};
</script>

<style></style>
