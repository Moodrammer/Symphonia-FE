import { Server, Model, Response, JSONAPISerializer } from "miragejs";
import playlistJson from "./api/mock/data/playlist.json";
import trackJSON from "./api/mock/data/track.json";
import artistJSON from "./api/mock/data/artist.json"

//The makeserver function to be used to enable Mirage to intercept your requests
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
      track: Model,
      bestsong: Model,
      playlist: Model,
      artist: Model
    },
    
    seeds(server) {
      //creating a user for testing purposes
      server.create("user", {
        name: "Bobuser",
        email: "Bob@gmail.com",
        password: "12345678",
        DateOfBirth: "12-12-1980",
        gender: "male",
        type: "user"
      });
      //creating an artist for testing purposes
      server.create("user", {
        name: "artistic",
        email: "artist@gmail.com",
        password: "12345678",
        DateOfBirth: "18-12-1995",
        gender: "male",
        type: "artist"
      });
      
      //This part is just to fake mirage in order to persist the data of only one user
       if(sessionStorage.getItem("SignedUpUser") != null){
        //The signed up user should remain in the localstorage so that when mirage loads each time it loads his data 
        server.create("user" , JSON.parse(sessionStorage.getItem("SignedUpUser")))
         localStorage.removeItem("SignedUpUser")
       }
      server.create("bestsong", 
      {
        songs: [
          {
            singerName: "Eminim",
            songName: "changes1",
            imageLink: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            songLink: "/songlink"
          },
          {
            singerName: "2Pac",
            songName: "changes2",
            imageLink: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            songLink: "/songlink"
          },
          {
            singerName: "2Pac",
            songName: "changes3",
            imageLink: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            songLink: "/songlink"
          },
          {
            singerName: "2Pac",
            songName: "changes4",
            imageLink: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            songLink: "/songlink"
          },
          {
            singerName: "2Pac",
            songName: "changes5",
            imageLink: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            songLink: "/songlink"
          },
          {
            singerName: "2Pac",
            songName: "changes6",
            imageLink: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
            songLink: "/songlink"
          }
        ]
      });

      playlistJson.items.forEach(element => {
        server.create("playlist", element);
      });

      trackJSON.forEach(element => {
        server.create("track",element);
      });

      artistJSON.items.forEach(element => {
        server.create("artist",element);
      })
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
        let user_id=request.params.user_id;
        let newPlaylist = JSON.parse(request.requestBody).data;
        schema.create("playlist", {
          name: newPlaylist.name,
          liked: true
        });
        return new Response(
          200,
          {},
          {
            name: newPlaylist.name,
            id: schema.playlists.find(schema.playlists.all().length).id,
            description: null,
            followers: {
              href: null,
              total: 0
            },
            href: "https://api.symphonia.com/v1/users/thelinmichael/playlists/"+schema.playlists.find(schema.playlists.all().length).id,
            images: [{
              url: "http://source.unsplash.com/mp_FNJYcjBM"
            }],
            owner: {
              href: "https://api.symphonia.com/v1/users/"+user_id,
              id: user_id,
              type: "user"
            },
            public: false,
            tracks: {
              href: "https://api.symphonia.com/v1/users/thelinmichael/playlists/7d2D2S200NyUE5KYs80PwO/tracks",
              items: [],
              limit: 100,
              next: null,
              offset: 0,
              previous: null,
              total: 0
            },
            type: "playlist"
          });
      });
///////////////////////////////////////////////////////////////////////////////////
//Get a List of Current User's Playlists
///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/playlists", schema => {
        return schema.playlists.where({liked: true}).models;
      });
///////////////////////////////////////////////////////////////////////////////////
//Get a User's Saved Tracks                "Liked Songs"
///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/tracks", (schema) => {
        return schema.tracks.where({liked: true}).models;
      });
///////////////////////////////////////////////////////////////////////////////////
//Get a List of Popular Playlists
///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/popularPlaylists",(schema) => {
        return schema.playlists.where({popularity: 90}).models;
      })
///////////////////////////////////////////////////////////////////////////////////
//Get a List of Popular Artists
///////////////////////////////////////////////////////////////////////////////////
      this.get("/v1/me/popularArtists",(schema) => {
        return schema.artists.where({popularity : 90}).models;
      })
///////////////////////////////////////////////////////////////////////////////////
//Get a List of Genre Playlists
///////////////////////////////////////////////////////////////////////////////////
      this.get('v1/browse/categories/:category_id/playlists',(schema , request) => {
        let id= request.params.category_id;
        return schema.playlists.where({genre: id}).models;
      })
///////////////////////////////////////////////////////////////////////////////////
      // this.urlPrefix = 'http://localhost:8080';

      //this.get("/search", schema => {

      //return schema.users.all()

      //})

      this.get("/v1/bestsongs"),
        schema => {
          return schema.bestsongs.bestSixSongs;
        };
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
                  type: schema.users.find(i).type
                }
              }
            );
          }
        }
        return new Response(400, {}, {});
      }),
        //Intercepts post requests from Register page
        this.post("/v1/users/signup", (schema, request) => {
          //create a new user in the server schema
          //parse the sent request body to JSON
          let attrs = JSON.parse(request.requestBody);
          //create a new user with the given data
          schema.create("user", {
            name: attrs.name,
            email: attrs.email,
            password: attrs.password,
            DateOfBirth: attrs.dateOfBirth,
            gender: attrs.gender,
            type: attrs.type
          });

          //Add the first signed up user to the data base to create some fake pesistance to the data of mirage
          sessionStorage.setItem("SignedUpUser", JSON.stringify(schema.users.find(3)))
          console.log(schema.users.all().length)        
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
                __v: 0
              }
            }
          );
        });
    }
  });

  return server;
}
