<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      enctype="multipart/form-data"
      dark
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add Album</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Album</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Album Title*"
                  required
                  v-model="albumTitle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Number of Tracks*"
                  required
                  v-model="albumTracksNumber"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-file-input
                  accept="image/*"
                  :rules="rules"
                  placeholder="Album Photo"
                  prepend-icon="mdi-camera"
                  v-model="albumPhoto"
                  required
                  loading="true"
                ></v-file-input>

                <!-- <v-btn round @click="show = true"
                  ><v-icon>mdi-camera</v-icon></v-btn
                > -->
                <!-- <imageCrop
                  @crop-success="cropSuccess"
                  v-model="show"
                  :width="1000"
                  :height="1000"
                  langType="en"
                >
                </imageCrop> -->
              </v-col>
            </v-row>

            <div v-for="i in tracksNumber" :key="i">
              <v-row><v-divider></v-divider></v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :placeholder="`Track${i} Name`"
                    required
                    v-model="albumTrackName[i - 1]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-file-input
                    accept="audio/mp3"
                    :rules="rules"
                    :placeholder="`Track${i}.mp3`"
                    prepend-icon="mdi-music"
                    v-model="albumTrackFile[i - 1]"
                    required
                    loading="true"
                  ></v-file-input>
                </v-col>
                <!-- <v-row>
                <v-col><v-title>Track{{ i }} Categories:</v-title></v-col>
              </v-row> -->
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                    class="pt-0"
                    v-for="(item, index) in albumTracksCategories[i - 1]"
                    :key="index"
                  >
                    <v-checkbox
                      v-model="item.checked"
                      :label="item.name"
                    ></v-checkbox>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-switch
                      v-model="explicit[i - 1]"
                      label="Explicit"
                    ></v-switch>
                  </v-col>
                  <v-col>
                    <v-switch
                      v-model="premium[i - 1]"
                      label="Premium"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-row>
            </div>
          </v-container>
          <!-- <small>*indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
        </v-card-actions>
        <v-text-field
          v-if="startUpload"
          color="success"
          loading
          disabled
        ></v-text-field>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="uploading">
      <v-text-field color="success" loading disabled></v-text-field>
      <h6 v-for="(item, index) in uploadedFiles" :key="index">
        {{ item }} uploaded <v-icon>mdi-check</v-icon>
      </h6>
    </v-dialog>
  </v-row>
</template>

<script>
import getuserToken from "../../mixins/userService";
import axios from "axios";
// import imageCrop from "vue-image-crop-upload";
export default {
  components: {
    // imageCrop,
  },

  data: () => ({
    uploadedFiles: [],
    uploading: false,
    rules: [(value) => !value || value.size <= 1000000 || "MAX SIZE IS 1 MB"],
    albumTracksNumber: 0,
    premium: [],
    explicit: [],
    startUpload: false,
    show: false,
    dialog: false,
    albumTitle: null,
    albumPhoto: null,
    albumTrackName: [],
    albumTrackFile: [],
    categories: [],
    albumTracksCategories: [],
    albumID: null,
    alert: {
      msg: "Please Complete required fields",
      type: "error",
      show: false,
    },
  }),
  mixins: [getuserToken],
  watch: {
    explicit: function(newValue) {
      console.log(newValue);
    },
    uploading: function() {
      this.uploadedFiles = [];
    },
    tracksNumber: function(newValue) {
      console.log(newValue);
      let x = this.categories;
      this.albumTracksCategories = [];
      this.premium = [];
      this.explicit = [];
      this.albumTrackName = [];
      this.albumTrackFile = [];

      for (let i = 0; i < newValue; i++) {
        this.albumTracksCategories.push(JSON.parse(JSON.stringify(x)));
        this.premium.push(false);
        this.explicit.push(false);
      }
      console.log(this.albumTracksCategories);
    },
  },
  computed: {
    tracksNumber: function() {
      return parseInt(this.albumTracksNumber);
    },
  },
  created() {
    axios
      .get("/v1/browse/categories", {
        headers: {
          Authorization: `Bearer ${this.getuserToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        response.data.categories.items.forEach((element) => {
          this.categories.push({
            id: element._id,
            name: element.name,
            checked: false,
          });
        });
        console.log(this.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addTrackToAblum(payload) {
      const form = new FormData();
      console.log("sadsdsa", payload);
      // form.append("my_field", "my value");
      form.append("name", payload.name);
      form.append("track", payload.track);
      payload.categories.forEach((element) => {
        form.append("category", element.id);
      });
      form.append("album", payload.albumID);
      form.append("explicit", payload.explicit);
      form.append("premium", payload.premium);
      let token = this.getuserToken();
      axios
        .post("/v1/users/tracks", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.uploadedFiles.push(payload.name);
          // this.albumID = response.
        })
        .catch((error) => console.log(error));
      //   dialog = false
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
    },

    cropSuccess(imgDataUrl, field) {
      this.albumPhoto = this.dataURItoBlob(imgDataUrl);
      console.log(this.albumPhoto, field);
    },
    submit() {
      console.log(this.albumPhoto);
      if (this.albumTitle == null || this.albumPhoto == null) {
        this.alert.show = true;
        this.startUpload = true;
        return;
      }
      this.uploading = true;
      this.dialog = false;
      let token = this.getuserToken();
      console.log(token);
      console.log(this.albumTitle, this.albumPhoto);
      const FormData = require("form-data");

      const form = new FormData();
      // form.append("my_field", "my value");
      form.append("name", this.albumTitle);
      form.append("image", this.albumPhoto);

      axios
        .post("/v1/albums", form, {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'content-type': 'multipart/form-data'
          },
        })
        .then((response) => {
          console.log(response);
          this.albumID = response.data._id;
          console.log(this.albumID);
          console.log(this.albumTrackName.length);
          for (let i = 0; i < this.albumTrackName.length; i++)
            this.addTrackToAblum({
              name: this.albumTrackName[i],
              track: this.albumTrackFile[i],
              explicit: this.explicit[i],
              premium: this.premium[i],
              categories: this.albumTracksCategories[i].filter(
                (e) => e.checked
              ),
              albumID: this.albumID,
            });
          this.startUpload = false;
        })
        .catch((error) => console.log(error));
      //   dialog = false
    },
  },
};
</script>

<style></style>
