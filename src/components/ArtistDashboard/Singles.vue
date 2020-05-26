<template>
  <v-container fluid>
    <!-- <img src="../../assets/s11 .png" alt=""> -->
    <h1 class="display-4 grey--text ml-12 my-4">Singles</h1>
    <v-dialog persistent max-width="1000" v-model="startLoading">
      <v-card-title class="white--text">Please Wait...</v-card-title>
      <v-progress-linear v-model="uploadingDone" height="25" reactive>
        <strong>{{ Math.ceil(uploadingDone) }}%</strong>
      </v-progress-linear>
    </v-dialog>
    <v-dialog dark v-model="dialog.remove" max-width="500">
      <v-card>
        <v-card-title class="headline"
          >Delete {{ operation.title }}?</v-card-title
        >
        <v-card-text class="mt-5">
          This can’t be undone and it will be removed from everything.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="normal darken-1" text @click="reset()">
            Cancel
          </v-btn>

          <v-btn color="error darken-1" text @click="remove()">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog dark v-model="dialog.rename" max-width="500">
      <v-card>
        <v-card-title class="headline"
          >Rename {{ operation.title }}</v-card-title
        >
        <v-form ref="renameForm">
          <v-text-field
            class="mt-5 mx-3"
            outlined
            v-model="title"
            label="New Title"
            :rules="titleRules"
            prepend-icon="mdi-text-short"
          >
          </v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="normal darken-1" text @click="reset()">
              Cancel
            </v-btn>

            <v-btn color="success darken-1" text @click="rename()">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog dark v-model="dialog.addAlbum" max-width="700">
      <v-card>
        <v-card-title class="headline">Add new album</v-card-title>
        <v-form ref="albumForm">
          <v-text-field
            outlined
            class="mx-9 mt-8"
            v-model="title"
            :rules="titleRules"
            label="Album Title"
            prepend-icon="mdi-text-short"
            required
          ></v-text-field>

          <v-file-input
            class="mx-9 my-5"
            label="Album Cover"
            :rules="fileRules"
            v-model="cover"
            show-size
            accept="image/*"
            required
            outlined
            prepend-icon="mdi-camera"
          ></v-file-input>

          <v-menu
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                class="mx-9 my-5"
                label="Release Date"
                prepend-icon="mdi-calendar"
                readonly
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              dark
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>

          <v-text-field
            outlined
            class="mx-9 mt-8"
            v-model="copyrightsText"
            :rules="cpyRules"
            label="Copyrights Text"
            prepend-icon="mdi-copyright"
            required
          ></v-text-field>
          <div class="mx-9 mt-2">
            <p>{{ "Copyrights Type" }}</p>
            <v-radio-group v-model="copyrightsType" :mandatory="false">
              <v-radio label="C" value="C"></v-radio>
              <v-radio label="P" value="P"></v-radio>
            </v-radio-group>
          </div>

          <v-col class="text-right">
            <v-btn color="normal darken-1" text @click="reset()">
              Cancel
            </v-btn>

            <v-btn color="success darken-1" text @click="addAlbum">
              Submit
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog dark v-model="dialog.addSong" max-width="700">
      <v-card>
        <v-card-title class="headline"
          >Add Song to {{ operation.title }}</v-card-title
        >
        <v-form ref="songForm">
          <v-text-field
            outlined
            class="mx-9 mt-8"
            v-model="title"
            :rules="titleRules"
            label="Song Title"
            prepend-icon="mdi-text-short"
          ></v-text-field>

          <v-file-input
            class="mx-9 my-5"
            label="Song .mp3"
            :rules="fileRules"
            v-model="file"
            show-size
            accept="audio/mp3"
            outlined
            prepend-icon="mdi-file-music"
          ></v-file-input>
          <v-row no-gutters align="center" class="px-9">
            <v-col cols="6">
              <p>Categories</p>
              <v-checkbox
                v-for="(category, index) in categories"
                :key="index"
                v-model="selectedCategories"
                :rules="categoriesRules"
                :label="category.name"
                :value="category.id"
              >
              </v-checkbox>
            </v-col>

            <v-col cols="6">
              <v-switch
                color="red"
                v-model="explicit"
                label="Explicit"
              ></v-switch>
              <v-switch
                color="orange"
                v-model="premium"
                label="Premium"
              ></v-switch>
            </v-col>
          </v-row>

          <v-col class="text-right">
            <v-btn color="normal darken-1" text @click="reset()">
              Cancel
            </v-btn>

            <v-btn color="success darken-1" text @click="addSong()">
              Submit
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-dialog>
    <v-card max-width="1000" class="mx-auto mt-10" dark>
      <v-toolbar dark class="mt-12">
        <v-spacer></v-spacer>
        <v-btn @click="dialog.addAlbum = true">+ new album</v-btn>
      </v-toolbar>

      <v-list dark>
        <v-list-group
          v-for="(item, index) in allArtistSingles"
          :key="index"
          v-model="item.active"
        >
          <template v-slot:activator>
            <v-col cols="1" class="ma-0 pa-0">
              <v-list-item-subtitle> {{ index + 1 }} </v-list-item-subtitle>
            </v-col>
            <v-list-item-avatar tile size="60">
              <img :src="item.image" />
            </v-list-item-avatar>

            <v-list-item-content class="ml-3">
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-spacer></v-spacer>
            </v-list-item-content>
          </template>

          <v-row
            class="px-auto py-1 grey darken-3"
            justify="center"
            align="center"
          >
            <v-btn
              fab
              small
              text
              title="add songs to the album"
              @click="setOperationData('addSong', item.name, item.id, null)"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <v-btn fab small text class="mx-6" title="edit album name"
              ><v-icon
                @click="setOperationData('rename', item.name, item.id, null)"
                >mdi-pencil</v-icon
              ></v-btn
            >
            <v-btn fab small text title="delete album"
              ><v-icon
                @click="setOperationData('remove', item.name, item.id, null)"
                >mdi-delete</v-icon
              ></v-btn
            >
          </v-row>

          <v-list-item
            v-for="(subItem, i) in item.tracks"
            :key="i"
            class="grey darken-4"
          >
            <v-col cols="1" class="ml-5 mr-0 pa-0">
              <v-list-item-subtitle> {{ i + 1 }} </v-list-item-subtitle>
            </v-col>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.name"></v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-btn fab x-small text title="edit song name" class="mx-6"
              ><v-icon
                @click="
                  setOperationData(
                    'rename',
                    subItem.name,
                    item.id,
                    subItem._id
                  )
                "
                >mdi-pencil</v-icon
              ></v-btn
            >
            <v-btn fab x-small text title="delete song"
              ><v-icon
                @click="
                  setOperationData(
                    'remove',
                    subItem.name,
                    item.id,
                    subItem._id
                  )
                "
                >mdi-delete</v-icon
              ></v-btn
            >
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import getuserToken from "../../mixins/userService";

export default {
  mixins: [getuserToken],
  data() {
    return {
      fileRules: [
        (value) => value != null || "REQUIRED",
        (value) => value == null || value.size <= 1000000 || "MAX SIZE IS 1 MB",
      ],
      titleRules: [
        (value) =>
          value == null || value.length <= 50 || "MAX LENGTH IS 50 CHARACTERS",
        (value) => (value != null && value.length > 0) || "REQUIRED",
      ],
      categoriesRules: [
        (value) =>
          value == null ||
          value.length > 0 ||
          "at least one category should be selected",
      ],
      cpyRules: [(value) => (value != null && value.length > 0) || "REQUIRED"],
      selectedCategories: [],
      explicit: false,
      premium: false,
      copyrightsText: null,
      copyrightsType: "C",
      date: new Date().toISOString().substr(0, 10),
      dialog: { rename: false, remove: false, addAlbum: false, addSong: false },
      operation: { title: null, albumID: null, songID: null },
      title: null,
      cover: null,
      file: null,
    };
  },
  computed: {
    startLoading: {
      get() {
        console.log(this.uploadingDone != 0);
        console.log(this.uploadingDone);
        if(this.uploadingDone == 0)
          this.reset();
        return this.uploadingDone != 0 && this.uploadingDone;
      },
      set(value) {
        value;
      },
    },
    ...mapGetters("artist", ["allArtistSingles", "uploadingDone"]),
    categories: function() {
      let x = this.$store.state.artist.simplifiedCategories;
      console.log(x);
      return x;
    },
  },
  created: function() {
    this.getSimplifiedCategories({
      token: this.getuserToken(),
    });
    this.getArtistAlbums({
      token: this.getuserToken(),
      id: this.getuserID(),
    });
  },

  methods: {
    ...mapActions("artist", [
      "addNewAlbum",
      "addTrackToAlbum",
      "getArtistAlbums",
      "getSimplifiedCategories",
      "renameAlbum",
      "renameTrack",
      "deleteAlbum",
      "deleteTrack",
    ]),
    reset() {
      this.dialog.rename = false;
      this.dialog.remove = false;
      this.dialog.addAlbum = false;
      this.dialog.addSong = false;
      this.selectedCategories = [];
      this.explicit = false;
      this.premium = false;
      this.copyrightsText = null;
      this.title = null;
      this.cover = null;
      this.file = null;
    },
    addAlbum() {
      console.log(this.title, this.cover);
      if (!this.$refs.albumForm.validate()) return;
      this.startLoading = true;
      let payload = {
        token: this.getuserToken(),
        title: this.title,
        cover: this.cover,
        type: "single",
        copyrightsText: this.copyrightsText,
        copyrightsType: this.copyrightsType,
        date: this.date,
      };
      this.addNewAlbum(payload);
    },
    addSong() {
      console.log(this.title, this.cover);
      if (!this.$refs.songForm.validate()) return;
      this.startLoading = true;
      console.log("sdsadsada", this.selectedCategories);
      let payload = {
        token: this.getuserToken(),
        title: this.title,
        track: this.file,
        explicit: this.explicit,
        premium: this.premium,
        categories: this.selectedCategories,
        album: this.operation.albumID,
      };
      this.addTrackToAlbum(payload);
    },
    remove() {
      if (this.operation.songID == null) {
        //rename album by this.title
        this.deleteAlbum({
          token: this.getuserToken(),
          id: this.operation.albumID,
        });
      } else {
        this.deleteTrack({
          token: this.getuserToken(),
          id: this.operation.songID,
        });
      }
      this.title = null;
      this.dialog.remove = false;
    },
    rename() {
      if (!this.$refs.renameForm.validate()) return;
      if (this.operation.songID == null) {
        //rename album by this.title
        this.renameAlbum({
          token: this.getuserToken(),
          name: this.title,
          id: this.operation.albumID,
        });
      } else {
        console.log("yaba a7la 4o8l");
        this.renameTrack({
          token: this.getuserToken(),
          name: this.title,
          id: this.operation.songID,
        });
      }
      this.title = null;
      this.dialog.rename = false;
    },
    setOperationData(type, title, albumID, songID) {
      this.operation.title = title;
      this.operation.albumID = albumID;
      this.operation.songID = songID;
      console.log(this.operation, "sdsadsads");
      if (type == "remove") this.dialog.remove = true;
      else if (type == "rename") this.dialog.rename = true;
      else if (type == "addSong") this.dialog.addSong = true;
    },
  },
};
</script>
