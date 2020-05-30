<template>
  <v-container class="mx-0 mt-5 pl-0 pr-5 pt-12" fluid fill>
    <v-row fill-height justify="left" align="center" class="mx-0 px-0">>
      <v-col cols="5">
        <v-img src="../../assets/logo_artist.png" alt=""> </v-img>
      </v-col>
      <v-col cols="6">
        <v-card-title
          class="display-3 white--text"
          style="word-break: normal; line-height: 1.6;"
        >
          <strong>{{ mainQuote.quote }}</strong
          ><br />
          <span class="display-1"
            ><em>- {{ mainQuote.artist }}</em></span
          >
        </v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import getusername from "../../mixins/userService/getusername";

export default {
  mixins: [getusername],
  data: function() {
    return {
      quotes: [
        {
          artist: "Ralph Waldo Emerson",
          quote: "“Every artist was first an amateur”"
        },
        {
          artist: "Henri Matisse",
          quote: "“Creativity takes courage”"
        },
        {
          artist: "Pablo Picasso",
          quote:
            "“Every child is an artist. The problem is how to remain an artist once we grow up.”"
        },
        {
          artist: "Ansel Adams",
          quote: "“You don’t take a photograph, you make it”"
        },
        {
          artist: "Thomas Merton",
          quote:
            "“Art enables us to find ourselves and lose ourselves at the same time.”"
        },
        {
          artist: "Bob Ross",
          quote: "“We don’t make mistakes, just happy little accidents”"
        },
        {
          artist: "Horace",
          quote: "“A picture is a poem without words”"
        },
        {
          artist: "Jerzy Kosinski",
          quote: "“The principles of true art is not to portray, but to evoke”"
        },
        {
          artist: "Edgar Degas",
          quote:
            "“Painting is easy when you don’t know how, but very difficult when you do”"
        },
        {
          artist: "Calvin & Hobbes",
          quote:
            "“As my artist’s statement explains, my work is utterly incomprehensible and is therefore full of deep significance”"
        }
      ]
    };
  },
  computed: {
    mainQuote: function() {
      return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }
  }
};
</script>

<style></style>
