import { Server, Model, Response, JSONAPISerializer } from "miragejs";
import playlistJson from "./api/mock/data/playlist.json";
import trackJSON from "./api/mock/data/track.json";
import artistJSON from "./api/mock/data/artist.json";
import albumsJSON from "./api/mock/data/album.json";
import categoryJSON from "./api/mock/data/category.json";
import historyJSON from "./api/mock/data/history.json";
// import usersJSON from "./api/mock/data/users.json";

//The makeserver function to be used to enable Mirage to intercept your requests
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
      track: Model,
      playlist: Model,
      album: Model,
      artist: Model,
      soundplayer: Model,
      category: Model,
      deletedPlaylist: Model
    },

    seeds(server) {
      //creating a user for testing purposes
      server.create("user", {
        name: "Bobuser",
        email: "Bob@gmail.com",
        password: "12345678",
        dateOfBirth: "1980-12-12",
        gender: "male",
        type: "user",
        country: "EG",
        imageUrl:
          "https://thesymphonia.ddns.net/api/v1/images/users/default.png"
      });
      //creating an artist for testing purposes
      server.create("user", {
        name: "artistic",
        email: "artist@gmail.com",
        password: "12345678",
        dateOfBirth: "1995-12-18",
        gender: "male",
        type: "artist",
        country: "EG",
        imageUrl:
          "https://thesymphonia.ddns.net/api/v1/images/users/default.png"
      });

      server.create("deletedPlaylist", {
        name: "playlist",
        deletedAt: "2020-04-18T04:19:11.758Z"
      });

      //This part is just to fake mirage in order to persist the data of only one user
      if (sessionStorage.getItem("SignedUpUser") != null) {
        //The signed up user should remain in the localstorage so that when mirage loads each time it loads his data
        server.create(
          "user",
          JSON.parse(sessionStorage.getItem("SignedUpUser"))
        );
        localStorage.removeItem("SignedUpUser");
      }

      playlistJson.items.forEach(element => {
        server.create("playlist", element);
      });

      trackJSON.forEach(element => {
        server.create("track", element);
      });

      artistJSON.artists.items.forEach(element => {
        server.create("artist", element);
      });

      albumsJSON.items.forEach(element => server.create("album", element));
      // usersJSON.data.forEach(element => server.create("user", element));

      categoryJSON.data.categorys.forEach(element => {
        server.create("category", element);
      });
    },

    //Define serializers to format the responses
    serializers: {
      application: JSONAPISerializer
    },
    routes() {
      //namespace will be prepended to any route (it acts like the server base address)
      this.namespace = "/api";
      /////////////////////////////////////////////////////////////////////////////////
      // Create Playlist Request
      /////////////////////////////////////////////////////////////////////////////////
      this.post("/v1/users/:user_id/playlists", (schema, request) => {
        let user_id = request.params.user_id;
        let newPlaylist = JSON.parse(request.requestBody);
        schema.create("playlist", {
          name: newPlaylist.name,
          id: schema.playlists.all().length + 1,
          description: null,
          images: ["http://source.unsplash.com/mp_FNJYcjBM"],
          public: false,
          tracks: [],
          tracksCount: 0,
          owner: user_id,
          active: true
        });
        console.log(schema.playlists.all().length);
        let ID = schema.playlists.all().length;
        return schema.playlists.find(ID).attrs;
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Get a List of Current User's Playlists
      ///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/playlists", schema => {
        let owned = schema.playlists.where({ active: true }).models;
        let followed = schema.playlists.where({ liked: true }).models;
        for (let i = 0; i < followed.length; i++) owned.push(followed[i]);
        return new Response(
          200,
          {},
          {
            playlists: {
              items: owned
            }
          }
        );
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Get a User's Saved Tracks                "Liked Songs"
      ///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/tracks", schema => {
        return new Response(
          200,
          {},
          {
            tracks: {
              items: schema.tracks.where({ liked: true }).models
            }
          }
        );
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Get a List of Popular Playlists
      ///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/popularPlaylists", schema => {
        return schema.playlists.where({ popularity: 90 }).models;
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Get a List of Popular Artists
      ///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/popularArtists", schema => {
        return schema.artists.where({ popularity: 90 }).models;
      });

      ///////////////////////////////////////////////////////////////////////////////////
      //Get a List of Genre Playlists
      ///////////////////////////////////////////////////////////////////////////////////
      this.get(
        "v1/browse/categories/:category_id/playlists",
        (schema, request) => {
          let id = request.params.category_id;
          return new Response(
            200,
            {},
            {
              playlists: {
                items: schema.playlists.where({ genre: id }).models
              }
            }
          );
        }
      );
      ///////////////////////////////////////////////////////////////////////////////////
      //Get track
      ///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/users/track/:track_id", (schema, request) => {
        let trackId = request.params.track_id;
        console.log(trackId);
        return schema.tracks.find(trackId).attrs;
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Check user's saved tracks
      ///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/tracks/contains/", (schema, request) => {
        let trackId = request.queryParams.ids;
        return [schema.tracks.where({ id: trackId }).models[0].liked];
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Remove User's Saved Tracks
      ///////////////////////////////////////////////////////////////////////////////////
      this.delete("/v1/me/tracks", (schema, request) => {
        let trackId = request.queryParams.ids;
        schema.tracks.where({ _id: trackId }).update({ liked: false });
        return new Response(200, {}, {});
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Save Tracks for User
      ///////////////////////////////////////////////////////////////////////////////////
      this.put("/v1/me/tracks", (schema, request) => {
        let trackId = request.queryParams.ids;
        schema.tracks.where({ id: trackId }).update({ liked: true });
        return new Response(200, {}, {});
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Get a Category
      ///////////////////////////////////////////////////////////////////////////////////
      this.get("v1/browse/categories/:categoryId", (schema, request) => {
        let categoryID = request.params.categoryId;
        return new Response(
          200,
          {},
          {
            name: schema.categories.where({ id: categoryID }).models[0].name,
            id: schema.categories.where({ id: categoryID }).models[0].id,
            href: schema.categories.where({ id: categoryID }).models[0].href
          }
        );
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Get List of Categories
      ///////////////////////////////////////////////////////////////////////////////////
      this.get("v1/browse/categories", schema => {
        return new Response(
          200,
          {},
          {
            categories: {
              items: schema.categories.all().models
            }
          }
        );
      });
      ///////////////////////////////////////////////////////////////////////////////////
      //Follow a Playlist
      ///////////////////////////////////////////////////////////////////////////////////
      this.put("/v1/playlists/:playlistId/followers", (schema, request) => {
        let playlistID = request.params.playlistId;
        schema.playlists.where({ id: playlistID }).update({ liked: true });
        return new Response(200, {}, {});
      });
      ////////////////////////////////////////////////////////////////////////////////////
      //Get a Playlist
      ////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/playlists/:playlistId", (schema, request) => {
        let playlistID = request.params.playlistId;
        return schema.playlists.find(playlistID).attrs;
      });
      ////////////////////////////////////////////////////////////////////////////////////
      //Get playlist's tracks
      ////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/playlists/:playlistId/tracks", (schema, request) => {
        let playlistID = request.params.playlistId;
        let tracksID = schema.playlists.where({ id: playlistID }).models[0]
          .tracks;
        let tracksList = [];
        for (let i = 0; i < tracksID.length; i++) {
          tracksList.push(schema.tracks.where({ id: tracksID[i] }).models[0]);
        }
        return {
          tracks: {
            items: tracksList
          }
        };
      });
      //////////////////////////////////////////////////////////////////////////////////////
      //Check if Users Follow a Playlist
      //////////////////////////////////////////////////////////////////////////////////////
      this.get(
        "/v1/playlists/:playlistId/followers/contains",
        (schema, request) => {
          let playlistID = request.params.playlistId;
          return [schema.playlists.where({ id: playlistID }).models[0].liked];
        }
      );
      //////////////////////////////////////////////////////////////////////////////////////
      //Unfollow a playlist
      //////////////////////////////////////////////////////////////////////////////////////
      this.delete("/v1/playlists/:playlistId/followers", (schema, request) => {
        let playlistID = request.params.playlistId;
        schema.playlists.where({ id: playlistID }).update({ liked: false });
        return new Response(200, {}, {});
      });
      //////////////////////////////////////////////////////////////////////////////////////
      //Delete a playlist
      //////////////////////////////////////////////////////////////////////////////////////
      this.delete("/v1/playlists/:ID", (schema, request) => {
        let playlistID = request.params.ID;
        schema.playlists.where({ id: playlistID }).update({ active: false });
        server.create("deletedPlaylist", {
          name: schema.playlists.where({ id: playlistID }).name,
          deletedAt: "2020-04-18T04:19:11.758Z"
        });
        return new Response(200, {}, {});
      });
      ///////////////////////////////////////////////////////////////////////////////////////
      //Get an album
      ///////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/albums/:ID", (schema, request) => {
        let albumID = request.params.ID;
        return schema.albums.find(albumID).attrs;
      });
      ///////////////////////////////////////////////////////////////////////////////////////
      //Get an album's tracks
      ///////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/albums/:ID/tracks", (schema, request) => {
        let albumID = request.params.ID;
        return {
          tracks: {
            items: schema.albums.where({ _id: albumID }).models[0].tracks
          }
        };
      });
      ////////////////////////////////////////////////////////////////////////////////////////
      //Check User's Saved Albums
      ////////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/albums/contains", (schema, request) => {
        let albumID = request.queryParams.ids;
        return [schema.albums.where({ _id: albumID }).models[0].liked];
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      //Save Albums for Current User
      /////////////////////////////////////////////////////////////////////////////////////////
      this.put("/v1/me/albums", (schema, request) => {
        let albumID = JSON.parse(request.requestBody);
        schema.albums.where({ _id: albumID[0] }).update({ liked: true });
        return new Response(200, {}, {});
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      //Get current user followed playlists
      /////////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/following/playlists", schema => {
        return schema.playlists.where({ liked: true }).models;
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      //Remove Albums for Current User
      /////////////////////////////////////////////////////////////////////////////////////////
      this.delete("/v1/me/albums", (schema, request) => {
        let albumID = request.queryParams.ids;
        schema.albums.where({ _id: albumID }).update({ liked: false });
        return new Response(200, {}, {});
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      //Change Playlist Details
      /////////////////////////////////////////////////////////////////////////////////////////
      this.patch("/v1/playlists/:ID", (schema, request) => {
        let playlistID = request.params.ID;
        let status = schema.playlists.where({ id: playlistID }).models[0]
          .public;
        status = !status;
        schema.playlists.where({ id: playlistID }).update({ public: status });
        return schema.playlists.find(playlistID).attrs;
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      // Get Current User Owned Playlists
      /////////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/playlists/owned", schema => {
        return schema.playlists.where({ active: true }).models;
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      // Add Tracks to Playlist
      /////////////////////////////////////////////////////////////////////////////////////////

      /////////////////////////////////////////////////////////////////////////////////////////
      //Get User's History
      /////////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/recently-played", () => {
        return historyJSON;
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      //Get List of new-releases
      /////////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/browse/new-releases", schema => {
        return {
          albums: {
            items: schema.albums.all().models
          }
        };
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/albums", schema => {
        return {
          Albums: { items: schema.albums.where({ liked: true }).models }
        };
      });

      // this.delete("/v1/me/albums", (schema, request) => {
      //   var x = "";

      //   for (var i = 2; i < request.requestBody.length - 2; i++)
      //     x += request.requestBody[i];
      //   return schema.albums.findBy(album => album._id === x).destroy();
      // });

      //////////////  Artist /////////////////////////////////////////////////////////
      this.get("/v1/me/following", (schema, request) => {
        if (request.queryParams.type === "artist")
          return { artists: { items: schema.artists.all().models } };
      });

      this.delete("/v1/me/following", (schema, request) => {
        if (request.queryParams.type === "artist") {
          return schema.artists
            .findBy(artist => artist._id === request.queryParams.ids)
            .destroy();
        }
      });
      ///////////////////////////////////////////////////////////////////////////////

      ///////////////////////USER UI/////////////////////////////////////////////////
      this.get("/v1/users/:id/playlists", schema => {
        let x = schema.playlists.all().models;
        let z = [];
        x.forEach(element => {
          let y = {
            name: x.name,
            images: element.images,
            _id: element.id,
            owner: { name: "user" },
            public: true
          };
          z.push(y);
        });
        console.log(z);
        return { playlists: { items: z } };
      });
      this.get("/v1/me/:id", (schema, request) => {
        let x = schema.users.findBy(user => user.id === request.params.id);
        return { name: x.name, imageUrl: x.imageUrl };
      });
      //////////////////////////////////////////////////////////////////////////////
      //Intercepting Login post requests
      this.post("/v1/users/login", (schema, request) => {
        //turn attributes to json to be able to access the data of the request
        let attrs = JSON.parse(request.requestBody);
        let i;
        for (i = 1; i <= schema.users.all().length; i++) {
          if (
            schema.users.find(i).email == attrs.email &&
            schema.users.find(i).password == attrs.password
          ) {
            return new Response(
              200,
              {},
              {
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MzQ2MiwiZXhwIjoxNTgzNTc3MDYyfQ.P_nm8thbkOzKBnbpqkBL1_SuRzZxt5eFFFN0aZ6AbBQ",
                user: {
                  _id: schema.users.find(i).id,
                  email: attrs.email,
                  name: schema.users.find(i).name,
                  type: schema.users.find(i).type,
                  imageUrl:
                    "https://thesymphonia.ddns.net/api/v1/images/users/default.png"
                }
              }
            );
          }
        }
        return new Response(
          400,
          {},
          {
            status: "fail",
            msg: "Incorrect email or password"
          }
        );
      }),
        //Intercepts post requests from Register page
        this.post("/v1/users/signup", (schema, request) => {
          //create a new user in the server schema
          //parse the sent request body to JSON
          let attrs = JSON.parse(request.requestBody);
          //make sure the sent email doesn't exist before
          var exists = false;
          for (let i = 1; i <= schema.users.all().length; i++) {
            if (attrs.email == schema.users.find(i).email) {
              exists = true;
              break;
            }
          }
          //if the email already exists send an error
          if (!exists) {
            //create a new user with the given data
            schema.create("user", {
              name: attrs.name,
              email: attrs.email,
              password: attrs.password,
              dateOfBirth: attrs.dateOfBirth,
              gender: attrs.gender,
              type: attrs.type
            });

            //Add the first signed up user to the data base to create some fake pesistance to the data of mirage
            sessionStorage.setItem(
              "SignedUpUser",
              JSON.stringify(schema.users.find(3))
            );
            //return a request for now that the operation of creating the user was a success
            return new Response(
              201,
              {},
              {
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MTc3OSwiZXhwIjoxNTgzNTc1Mzc5fQ.vLNE0dCGYItCOl6dJl3-QOtqV2ZZ8zNDdc9jla76ijg",
                user: {
                  _id: schema.users.find(schema.users.all().length).id,
                  email: attrs.email,
                  name: attrs.name,
                  type: attrs.type,
                  imageUrl:
                    "https://thesymphonia.ddns.net/api/v1/images/users/default.png",
                  __v: 0
                }
              }
            );
          } else {
            //return an error object if the email address already exists
            return new Response(
              400,
              {},
              {
                status: "fail",
                msg: "email address already exists"
              }
            );
          }
        }),
        //Handling the Forget password request(asking for changing password email)
        this.post("/v1/users/forgotpassword", (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          //loop on all users to check if the user email sent exists in the server current database
          for (let i = 1; i <= schema.users.all().length; i++) {
            //if the email exists return a success response
            if (attrs.email == schema.users.find(i).email) {
              return new Response(200, {}, {});
            }
          }

          return new Response(400, {}, {});
        }),
        //Handling the changing password request(patch request for the new password)
        this.patch("/v1/users/resetpassword/:resettoken", (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          //for the sake of mocking only , treat the reset token as the user id
          let resettoken = parseInt(request.params.resettoken);
          console.log(request.params);
          //change the password of the first user for testing only
          schema.users.find(resettoken).update("password", attrs.password);
          console.log(schema.users.find(resettoken));
          console.log(attrs.password);
          return new Response(
            200,
            {},
            {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MTc3OSwiZXhwIjoxNTgzNTc1Mzc5fQ.vLNE0dCGYItCOl6dJl3-QOtqV2ZZ8zNDdc9jla76ijg",
              user: {
                _id: schema.users.find(resettoken).id,
                email: schema.users.find(resettoken).email,
                name: schema.users.find(resettoken).name,
                type: schema.users.find(resettoken).type,
                imageUrl:
                  "https://thesymphonia.ddns.net/api/v1/images/users/default.png"
              }
            }
          );
        }),
        // Get the current user's data to the account overview(User's Settings)
        this.get("/v1/me", (schema, request) => {
          // get the user's data from seed if exist
          if (request.requestHeaders.Authorization) {
            // return the user's data if exist in response
            //If the user checks rememberMe his token will be found in the localStorage
            let id;
            if (localStorage.getItem("userToken") != null) {
              id = localStorage.getItem("userID");
            }
            //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
            else if (sessionStorage.getItem("userToken") != null) {
              id = sessionStorage.getItem("userID");
            }
            return new Response(200, {}, schema.users.find(id).attrs);
          } else {
            // if the data isn't valid so return error status(400)
            return new Response(400, {}, {});
          }
        });
      // patch the user's password =>(change the current user's password)
      this.patch("/v1/users/updatepassword", (schema, request) => {
        let id;
        if (localStorage.getItem("userToken") != null) {
          id = localStorage.getItem("userID");
        }
        //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
        else if (sessionStorage.getItem("userToken") != null) {
          id = sessionStorage.getItem("userID");
        }
        let attr = JSON.parse(request.requestBody);
        let currentUser = schema.users.find(id);
        // check if the current user's entered password is equal that in the seed
        if (currentUser.password == attr.passwordCurrent) {
          // if it's right change it with the new one
          currentUser.update({ password: attr.password });
          return new Response(200, { token: id }, {});
        } else {
          // if not return error to the view to display wrong password
          return new Response(401, {}, {});
        }
      });
      // update the current user profile data
      this.put("/v1/me/", (schema, request) => {
        if (request.requestBody) {
          let attr = JSON.parse(request.requestBody);
          let id;
          if (localStorage.getItem("userToken") != null) {
            id = localStorage.getItem("userID");
          }
          //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
          else if (sessionStorage.getItem("userToken") != null) {
            id = sessionStorage.getItem("userID");
          }
          let currentUser = schema.users.find(id);
          currentUser.update({
            email: attr.email,
            gender: attr.gender,
            dateOfBirth: attr.dateOfBirth
          });

          return new Response(201, {}, {});
        } else {
          return new Response(401, {}, {});
        }
      });

      // Get the current user's data to the account overview(User's Settings)
      this.get("/v1/me", (schema, request) => {
        // get the user's data from seed if exist
        if (request.requestHeaders.Authorization) {
          // return the user's data if exist in response
          //If the user checks rememberMe his token will be found in the localStorage
          let id;
          if (localStorage.getItem("userToken") != null) {
            id = localStorage.getItem("userID");
          }
          //If not found in the localStorage then the user has chosen not to be remembered and the token is in the sessionStorage
          else if (sessionStorage.getItem("userToken") != null) {
            id = sessionStorage.getItem("userID");
          }
          return new Response(200, {}, schema.users.find(id).attrs);
        } else {
          // if the data isn't valid so return error status(400)
          return new Response(400, {}, {});
        }
      });

      //////////////////////////////////////////////////////////////////////////////////////
      //SOUNDPLAYER
      //////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/player/queue", () => {
        return new Response(
          200,
          {},
          {
            data: {
              queueTracks: [],
              previousTrack: null,
              nextTrack:
                "http://thesymphonia.ddns.net/api/v1/me/player/tracks/123"
            }
          }
        );
      });
      //////////////////////////////////////////////////////////////////////////////////////
      //
      //////////////////////////////////////////////////////////////////////////////////////
      this.post("/v1/me/player/tracks/:track_id", () => {
        return new Response(
          200,
          {},
          {
            data: "123"
          }
        );
      });
      //////////////////////////////////////////////////////////////////////////////////////
      //
      //////////////////////////////////////////////////////////////////////////////////////
      this.patch("/v1/me/player/repeatOnce", () => {
        return new Response(200, {}, {});
      });
      //////////////////////////////////////////////////////////////////////////////////////
      //
      //////////////////////////////////////////////////////////////////////////////////////
      const mockTracks = ["/track/123", "/track/456"];
      var currentlyPlaying = mockTracks[0];

      this.post("/v1/me/player/next", () => {
        if (currentlyPlaying == mockTracks[0]) {
          currentlyPlaying = mockTracks[1];
        } else {
          currentlyPlaying = mockTracks[0];
        }
        return new Response(200, {}, {});
      });
      //////////////////////////////////////////////////////////////////////////////////////
      //
      //////////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/player/currently-playing", () => {
        return new Response(
          200,
          {},
          {
            data: {
              currentTrack: currentlyPlaying
            }
          }
        );
      });
    }
  });

  return server;
}
