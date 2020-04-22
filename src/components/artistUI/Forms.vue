<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      enctype="multipart/form-data"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Album</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  label="Album Title*"
                  required
                  v-model="albumTitle"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-file-input
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Album Photo"
                  prepend-icon="mdi-camera"
                  v-model="albumPhoto"
                  required
                ></v-file-input>
                <v-btn round @click="show = true"
                  ><v-icon>mdi-camera</v-icon></v-btn
                >
                <imageCrop
                  @crop-success="cropSuccess"
                  v-model="show"
                  :width="1000"
                  :height="1000"
                  langType="en"
                >
                </imageCrop>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
        </v-card-actions>
        <v-alert dense outlined v-if="alert.show" :type="alert.type">{{
          alert.msg
        }}</v-alert>
      </v-card>
    </v-dialog>

    <img :src="albumPhoto" />
  </v-row>
</template>

<script>
import getuserToken from "../../mixins/userService";
import axios from "axios";
import imageCrop from "vue-image-crop-upload";
export default {
  components: {
    imageCrop,
  },

  data: () => ({
    show: false,
    dialog: false,
    albumTitle: null,
    albumPhoto: null,
    alert: {
      msg: "Please Complete required fields",
      type: "error",
      show: false,
    },
  }),
  mixins: [getuserToken],
  watch: {
    firstName: function(newValue) {
      console.log(newValue);
    },
  },
  methods: {
    dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


},

    cropSuccess(imgDataUrl, field) {
      this.albumPhoto = this.dataURItoBlob(imgDataUrl);
      console.log(this.albumPhoto,field);
    },
    submit() {
      if (this.albumTitle == null || this.albumPhoto == null) {
        this.alert.show = true;
        return;
      }
      let token = this.getuserToken();
      console.log(token);
      console.log(this.albumTitle, this.albumPhoto);
      const FormData = require('form-data');
 
      const form = new FormData();
      form.append('my_field', 'my value');
      form.append('name', this.albumTitle);
      form.append('image', this.albumPhoto);

      axios
        .post(
          "/v1/albums",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              // 'content-type': 'multipart/form-data'
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
      //   dialog = false
    },
  },
};
</script>

<style></style>
