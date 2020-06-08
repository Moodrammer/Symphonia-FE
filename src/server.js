import { Server, Model, Response, JSONAPISerializer } from "miragejs";
import playlistJson from "./api/mock/data/playlist.json";
import trackJSON from "./api/mock/data/track.json";
import artistJSON from "./api/mock/data/artist.json";
import albumsJSON from "./api/mock/data/album.json";
import categoryJSON from "./api/mock/data/category.json";
import historyJSON from "./api/mock/data/history.json";
import notificationsJSON from "./api/mock/data/notifications.json";
import getuserID from "./mixins/userService/getuserID.js";
import getusername from "./mixins/userService/getusername.js";
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
      deletedPlaylist: Model,
      notification: Model
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
          "https://thesymphonia.ddns.net/api/v1/images/users/default.png",
        followed: false,
        premium: false
      });
      //creating an artist for testing purposes
      server.create("user", {
        name: "Nasser Al-Qatami",
        email: "artist@gmail.com",
        password: "12345678",
        dateOfBirth: "1995-12-18",
        gender: "male",
        type: "artist",
        country: "EG",
        imageUrl:
          "https://i1.sndcdn.com/artworks-000102741362-wev1tn-t500x500.jpg",
        followed: false,
        premium: false
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

      notificationsJSON.items.forEach(element =>
        server.create("notification", element)
      );
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
          owner: { _id: user_id, name: "Bob" },
          active: true
        });
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
        let likedSongs = schema.tracks.where({ liked: true }).models;
        let totalNum = likedSongs.length;
        return new Response(
          200,
          {},
          {
            tracks: {
              items: likedSongs,
              total: totalNum
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
          name: schema.playlists.where({ id: playlistID }).models[0].name,
          id: playlistID,
          tracksCount: schema.playlists.where({ id: playlistID }).models[0]
            .tracksCount,
          deletedAt: "2020-04-18T04:19:11.758Z",
          deleted: true
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
        let tracksID = schema.albums.where({ id: albumID }).models[0].tracks;
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
        let albumID = request.queryParams.ids[0];
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
        let albumID = request.queryParams.ids[0];
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
        return {
          playlists: {
            items: schema.playlists.where({ active: true }).models
          }
        };
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      // Add Tracks to Playlist
      /////////////////////////////////////////////////////////////////////////////////////////
      this.post("/v1/playlists/:ID/tracks", (schema, request) => {
        let playlistID = request.params.ID;
        let playlistTracks = schema.playlists.where({ id: playlistID })
          .models[0].tracks;
        let numOfTracks = schema.playlists.where({ id: playlistID }).models[0]
          .tracksCount;
        let newTracks = JSON.parse(request.requestBody).tracks;
        for (let i = 0; i < newTracks.length; i++) {
          let exist = playlistTracks.indexOf(newTracks[i]);
          if (exist == -1) {
            numOfTracks = numOfTracks + 1;
            playlistTracks.push(newTracks[i]);
          }
        }
        schema.playlists
          .where({ id: playlistID })
          .update({ tracks: playlistTracks });
        schema.playlists
          .where({ id: playlistID })
          .update({ tracksCount: numOfTracks });
        return new Response(200, {}, {});
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      // Remove Track from Playlist
      /////////////////////////////////////////////////////////////////////////////////////////
      this.delete("/v1/playlists/:playlistID/tracks", (schema, request) => {
        let playlistID = request.params.playlistID;
        let trackID = request.queryParams.ids;
        let numOfTracks = schema.playlists.where({ id: playlistID }).models[0]
          .tracksCount;
        let playlistTracks = schema.playlists.where({ id: playlistID })
          .models[0].tracks;
        playlistTracks = playlistTracks.filter(function(item) {
          return item !== trackID;
        });
        numOfTracks -= 1;
        schema.playlists
          .where({ id: playlistID })
          .update({ tracks: playlistTracks });
        schema.playlists
          .where({ id: playlistID })
          .update({ tracksCount: numOfTracks });
        return new Response(200, {}, {});
      });
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
        return { playlists: { items: z } };
      });
      this.get("/v1/me/user/:id", (schema, request) => {
        let x = schema.users.findBy(user => user.id === request.params.id);
        return { name: x.name, imageUrl: x.imageUrl };
      });
      //////////////////////////////////////////////////////////////////////////////
      //Intercepting Login post requests
      this.post(
        "/v1/users/login",
        (schema, request) => {
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
                      "https://thesymphonia.ddns.net/api/v1/images/users/default.png",
                    premium: schema.users.find(i).premium
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
        },
        { timing: 2000 }
      ),
        //Intercept login with facebook request and return a static user
        // This request will be intercepted by mock only if the app in facebook developers dashboard
        // is set to development, otherwise it doesn't allow local host to retrieve the access token
        // so the request of sending the access token to our servers will not be accomplished
        this.post("/v1/users/auth/facebook/Symphonia", () => {
          return new Response(
            200,
            {},
            {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MzQ2MiwiZXhwIjoxNTgzNTc3MDYyfQ.P_nm8thbkOzKBnbpqkBL1_SuRzZxt5eFFFN0aZ6AbBQ",
              user: {
                email: "facebookMockUser@test.com",
                imageFacebookUrl: "../public/fbuser.png",
                name: "FB Mock User",
                premium: "false",
                type: "user",
                _id: 3
              }
            }
          );
        }),
        //Intercepts post requests from Register page
        this.post(
          "/v1/users/signup",
          (schema, request) => {
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
          },
          { timing: 2000 }
        ),
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
          //change the password of the first user for testing only
          schema.users.find(resettoken).update("password", attrs.password);
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
        //route for activating the artist account
        this.patch(
          "/v1/users/activate/:artistActivationToken",
          (schema, request) => {
            /*To simulate mocking backend acceptance of refusal let
              artistActivationToken: 1 => acceptance
              artistActivationToken: 0 => refusal
            */
            let isAccountActivated = parseInt(
              request.params.artistActivationToken
            );
            if (isAccountActivated) {
              return new Response(
                201,
                {},
                {
                  token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MTc3OSwiZXhwIjoxNTgzNTc1Mzc5fQ.vLNE0dCGYItCOl6dJl3-QOtqV2ZZ8zNDdc9jla76ijg",
                  user: {
                    _id: schema.users.find(2).id,
                    email: schema.users.find(2).email,
                    name: schema.users.find(2).name,
                    type: schema.users.find(2).type,
                    imageUrl:
                      "https://thesymphonia.ddns.net/api/v1/images/users/default.png"
                  }
                }
              );
            } else {
              return new Response(
                400,
                {},
                {
                  status: "fail",
                  msg:
                    "Your activation link is invalid , make sure to check the link sent by email"
                }
              );
            }
          },
          { timing: 2000 }
        ),
        //route for the currently used device
        this.get("/v1/me/player/devices", () => {
          return new Response(
            200,
            {},
            {
              data: [
                {
                  _id: "1",
                  devicesName: "Chrome"
                },
                {
                  _id: "2",
                  devicesName: "Chrome"
                },
                {
                  _id: "3",
                  devicesName: "Firefox"
                },
                {
                  _id: "4",
                  devicesName: "Chrome"
                }
              ]
            }
          );
        }),
        this.get("/v1/me/player/currently-playing", () => {
          return new Response(
            200,
            {},
            {
              data: {
                currentTrack: "/track/5e7d2dc03429e24340ff1396",
                device: "5e88ef4d54142e3db4d01ee5"
              }
            }
          );
        }),
        /////////////////////////////////////////////////////////////////////////////////
        //     Get the current user's data to the account overview(User's Settings)
        /////////////////////////////////////////////////////////////////////////////////
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
      /////////////////////////////////////////////////////////////////////////////////
      //       patch the user's password =>(change the current user's password)
      /////////////////////////////////////////////////////////////////////////////////
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
      /////////////////////////////////////////////////////////////////////////////////
      //                update the current user profile data
      /////////////////////////////////////////////////////////////////////////////////
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
      /////////////////////////////////////////////////////////////////////////////////
      //     Get the current user's data to the account overview(User's Settings)
      /////////////////////////////////////////////////////////////////////////////////
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
      /////////////////////////////////////////////////////////////////////////////////
      //              Get all the deleted playlists for current user
      /////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/playlists/deleted", (schema, request) => {
        if (request.requestHeaders.Authorization) {
          let result = schema.deletedPlaylists.all().models;
          let limit = request.params.limit;
          let offset = request.params.offset;
          let total = result.length;
          let toSend = {
            playlists: {
              total: total,
              items: result,
              limit: limit,
              offset: offset
            }
          };
          return new Response(200, {}, toSend);
        } else {
          // if the data isn't valid so return error status(400)
          return new Response(400, {}, {});
        }
      });
      /////////////////////////////////////////////////////////////////////////////////
      //              Restore the deleted playlist for current user
      /////////////////////////////////////////////////////////////////////////////////
      this.patch("/v1/me/playlists/:id", (schema, request) => {
        let result = schema.playlists.find(request.params.id);
        if (result) {
          result.update({
            active: true
          });
          return new Response(200, {}, result);
        } else {
          // if the data isn't valid so return error status(400)
          return new Response(400, {}, {});
        }
      });

      //////////////////////////////////////////////////////////////////////////////////////
      //SOUNDPLAYER
      //////////////////////////////////////////////////////////////////////////////////////
      var repeat = false;
      var repeatOnce = false;
      var shuffle = false;

      let mockTracks = [
        "http://thesymphonia.ddns.net/api/v1/me/player/tracks/123",
        "http://thesymphonia.ddns.net/api/v1/me/player/tracks/456",
        "http://thesymphonia.ddns.net/api/v1/me/player/tracks/789"
      ];
      var currentlyPlaying = mockTracks[1];
      var currentlyPlayingIndex = 1;

      var previousTrack = mockTracks[0];
      var nextTrack = mockTracks[2];

      this.get("/v1/me/player/currently-playing", () => {
        return new Response(
          200,
          {},
          {
            data: {
              currentTrack: currentlyPlaying,
              device: "5e88ef4d54142e3db4d01ee5"
            }
          }
        );
      }),
        this.get("/v1/me/player/queue", () => {
          return new Response(
            200,
            {},
            {
              data: {
                currentlyPlaying: {
                  currentTrack: currentlyPlaying
                },
                queueTracks: mockTracks,
                previousTrack: previousTrack,
                nextTrack: nextTrack,
                repeat: repeat,
                repeatOnce: repeatOnce,
                shuffle: shuffle
              }
            }
          );
        });
      //////////////////////////////////////////////////////////////////////////////////////
      //
      //////////////////////////////////////////////////////////////////////////////////////
      this.post("/v1/me/player/tracks/:track_id", (schema, request) => {
        var link =
          "http://thesymphonia.ddns.net/api/v1/me/player/tracks/" +
          request.params.track_id;

        let contextID = JSON.parse(request.requestBody).contextId;
        let contextType = JSON.parse(request.requestBody).context_type;
        let contextTracks = [];
        if (contextType == "album") {
          contextTracks = schema.albums.where({ id: contextID }).models[0]
            .tracks;
        } else if (contextType == "playlist") {
          contextTracks = schema.playlists.where({ id: contextID }).models[0]
            .tracks;
        } else if (contextType == "artist") {
          contextTracks = schema.albums
            .all()
            .models.filter(album => album.artist._id == contextID)[0].tracks;
        }
        mockTracks = [];
        for (let i = 0; i < contextTracks.length; i++) {
          mockTracks.push(
            schema.tracks.where({ id: contextTracks[i] }).models[0].link
          );
        }
        currentlyPlayingIndex = mockTracks.indexOf(link);

        currentlyPlaying = mockTracks[currentlyPlayingIndex];
        var nextPlayingIndex = (currentlyPlayingIndex + 1) % mockTracks.length;
        nextTrack = mockTracks[nextPlayingIndex];

        var previousPlayingIndex;
        if (currentlyPlayingIndex == 0) previousPlayingIndex = 2;
        else previousPlayingIndex = currentlyPlayingIndex - 1;
        previousTrack = mockTracks[previousPlayingIndex];

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
        repeatOnce = !repeatOnce;
        return new Response(200, {}, {});
      });
      this.patch("/v1/me/player/repeat", () => {
        repeat = !repeat;
        return new Response(200, {}, {});
      });
      this.patch("/v1/me/player/shuffle", () => {
        shuffle = !shuffle;
        return new Response(200, {}, {});
      });
      //////////////////////////////////////////////////////////////////////////////////////
      //
      //////////////////////////////////////////////////////////////////////////////////////
      this.post("/v1/me/player/next", () => {
        currentlyPlayingIndex = (currentlyPlayingIndex + 1) % mockTracks.length;

        var nextPlayingIndex = (currentlyPlayingIndex + 1) % mockTracks.length;

        previousTrack = currentlyPlaying;

        currentlyPlaying = nextTrack;

        nextTrack = mockTracks[nextPlayingIndex];

        return new Response(200, {}, {});
      });

      this.post("/v1/me/player/previous", () => {
        nextTrack = currentlyPlaying;

        currentlyPlaying = previousTrack;

        if (currentlyPlayingIndex == 0) currentlyPlayingIndex = 2;
        else currentlyPlayingIndex = currentlyPlayingIndex - 1;

        var previousPlayingIndex;

        if (currentlyPlayingIndex == 0) previousPlayingIndex = 2;
        else previousPlayingIndex = currentlyPlayingIndex - 1;

        previousTrack = mockTracks[previousPlayingIndex];

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

      this.get("/v1/me/checkout-session", () => {
        return new Response(
          200,
          {},
          {
            session: {
              id: "12"
            }
          }
        );
      });
      ////////////////////////////////////////////////////////////////////////
      //////////////////////// ARTIST DASHBOARD //////////////////////////////
      ////////////////////////////////////////////////////////////////////////

      ///// GET ARTIST ALBUMS
      this.get("/v1/artists/:artistID/albums/", (schema, request) => {
        let x = schema.albums
          .all()
          .models.filter(x => x.artist._id == request.params.artistID);
        let resp = [];
        x.forEach(album => {
          let b = schema.tracks
            .all()
            .models.filter(x => x.attrs.album.id == album.id);
          let tracks = [];
          b.forEach(track => {
            tracks.push({
              name: track.name,
              _id: track.trackId
            });
          });

          resp.push({
            name: album.name,
            id: album.id,
            _id: album.id,
            image: album.image,
            albumType: album.albumType,
            tracks: tracks
          });
        });
        return { albums: { items: resp } };
      });

      ///// ADD ARTIST ALBUM

      this.post("/v1/albums", (schema, request) => {
        upload(request);
        let id = schema.albums.all().models.length + 223;
        let x = {
          liked: false,
          albumType: request.requestBody.get("albumType"),
          tracksCount: "0",
          tracks: [],
          releaseDate: request.requestBody.get("releaseDate"),
          _id: id,
          id: id,
          name: request.requestBody.get("name"),
          image: "http://source.unsplash.com/2Qg4y32pdCc",
          artist: {
            name: getusername.methods.getusername(),
            _id: getuserID.methods.getuserID()
          }
        };
        server.create("album", x);
        return x;
      });

      ///// ADD ARTIST TRACK

      this.post("/v1/users/tracks", (schema, request) => {
        upload(request);

        let id = schema.albums.all().models.length + 117;
        let album = schema.albums.find(request.requestBody.get("album")).attrs;
        let x = {
          liked: false,
          premium: request.requestBody.get("premium"),
          explicit: request.requestBody.get("explicit"),
          durationMs: 374000,
          trackPath: "assets/Amr/sample2.mp3",
          album: {
            id: album.id,
            _id: album._id,
            name: album.name
          },
          _id: id,
          id: id,
          trackId: id,
          name: request.requestBody.get("name"),
          image: "http://source.unsplash.com/2Qg4y32pdCc",
          artist: {
            name: getusername.methods.getusername(),
            _id: getuserID.methods.getuserID()
          }
        };
        server.create("track", x);
        x.album = album.id;
        return x;
      });

      ///// DELETE ARTIST ALBUM

      this.delete("/v1/albums/:albumId", (schema, request) => {
        let albumId = request.params.albumId;
        schema.albums.where({ _id: albumId }).destroy();
        return new Response(200, {}, {});
      });

      ///// DELETE ARTIST TRACK

      this.delete("/v1/users/track/:trackId", (schema, request) => {
        let trackId = request.params.trackId;
        schema.tracks.where({ _id: trackId }).destroy();
        return new Response(200, {}, {});
      });

      ///// RENAME ARTIST ALBUM

      this.patch("/v1/albums/:ID", (schema, request) => {
        let albumID = request.params.ID;
        schema.albums
          .where({ id: albumID })
          .update({ name: JSON.parse(request.requestBody).name });
        return schema.albums.find(albumID).attrs;
      });

      ///// RENAME ARTIST TRACK

      this.patch("/v1/users/track/:ID", (schema, request) => {
        let trackID = request.params.ID;
        schema.tracks
          .where({ _id: trackID })
          .update({ name: JSON.parse(request.requestBody).name });
        let track = schema.tracks.find(trackID).attrs;
        track.album = track.album.id;
        return track;
      });

      ////////////////////////////////////////////////////////////////////////
      //////////////////////// ARTIST INTERFACE //////////////////////////////
      ////////////////////////////////////////////////////////////////////////

      ///// GET ARTIST INFO

      this.get("/v1/artists/:artistID", (schema, request) => {
        let x = schema.artists.where({ _id: request.params.artistID }).models[0]
          .attrs;
        return x;
      });

      ///// GET ARTIST TOP TRACKS

      this.get("/v1/artists/:artistID/top-tracks", (schema, request) => {
        let x = schema.tracks.all().models;
        x = x
          .filter(e => e.artist.id == request.params.artistID)
          .slice(request.queryParams.offset, request.queryParams.limit);
        return { tracks: { items: x } };
      });

      ///// GET ARTIST RELATED ARTISTS

      this.get("/v1/artists/:id/related-artists", schema => {
        return { artists: schema.artists.all().models };
      });

      ///// GET FOLLOWED ARTISTS

      this.get("/v1/me/following", (schema, request) => {
        if (request.queryParams.type === "artist")
          return {
            artists: { items: schema.artists.where({ followed: true }).models }
          };
      });

      ///// UNFOLLOW ARTIST

      this.delete("/v1/me/following", (schema, request) => {
        if (request.queryParams.type === "artist")
          return schema.artists
            .findBy(artist => artist._id === request.queryParams.ids)
            .update({ followed: false });
        else
          return schema.users
            .findBy(user => user.id === request.queryParams.ids)
            .update({ followed: false });
      });

      ///// FOLLOW ARTIST

      this.put("/v1/me/following", (schema, request) => {
        let r = JSON.parse(request.requestBody);
        if (r.type == "artist")
          return schema.artists
            .findBy(artist => artist._id === r.ids)
            .update({ followed: true });
        else
          return schema.users
            .findBy(user => user.id === r.ids)
            .update({ followed: true });
      });

      //// IF USER FOLLOW SPECIFIC ARTIST

      this.get("/v1/me/following/contains", (schema, request) => {
        return [
          schema.artists.findBy(
            artist => artist._id === request.queryParams.ids
          ).attrs.followed ||
            schema.users.findBy(user => user.id === request.queryParams.ids)
              .attrs.followed
        ];
      });

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////   Notifications   ///////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // Get Notification History

      this.get("/v1/me/notifications", schema => {
        let notifyList = [];
        for (let i = 1; i <= schema.notifications.all().length; i++) {
          var x = schema.notifications.find(i);
          var element = {
            notification: {
              title: x.title,
              body: x.body,
              icon: x.icon
            }
          };
          notifyList.push(element);
        }
        return new Response(
          200,
          {},
          {
            notifications: {
              items: notifyList
            }
          }
        );
      });

      this.patch("/v1/me/registration-token", () => {
        return new Response(200, {}, {});
      });
    }
  });

  return server;
}

function upload(request) {
  setTimeout(function() {
    request.upload._eventListeners.progress[1]({
      loaded: 400,
      total: 1000
    });
  }, 1000);

  setTimeout(function() {
    request.upload._eventListeners.progress[1]({
      loaded: 900,
      total: 1000
    });
  }, 2000);
  setTimeout(function() {
    request.upload._eventListeners.progress[1]({
      loaded: 1000,
      total: 1000
    });
  }, 3000);
}
