import { Server, Model, Response, JSONAPISerializer } from "miragejs";

//The makeserver function to be used to enable Mirage to intercept your requests
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
      bestsong: Model
    },

    seeds(server) {
      //creating some users to test login page
      server.create("user", {
        name: "Bobuser",
        email: "Bob@gmail.com",
        password: "12345678",
        DateOfBirth: "12-12-1980",
        gender: "male"
      });

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
      server.db.loadData({
        playlist: [
          {
            name: "playlist1"
          }
        ]
      });
    },

    //Define serializers to format the responses
    serializers: {
      application: JSONAPISerializer
    },

    routes() {
      //namespace will be prepended to any route (it acts like the server base address)
      this.namespace = "/api";
      this.post("/playlists", (schema, request) => {
        let newPlaylist = JSON.parse(request.requestBody).data;
        return schema.db.playlist.insert({
          name: newPlaylist
        });
      });

      this.get("/playlists", schema => {
        return schema.db.playlist;
      });

      this.get("/v1/me/player/tracks/history", schema => {
        return schema.db.playlist;
      });
      // this.urlPrefix = 'http://localhost:8080';

      //this.get("/search", schema => {

      //return schema.users.all()

      //})

      this.get("/v1/bestsongs"), schema => {
        return schema.bestsongs.bestSixSongs;
      }
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
                  _id: "5e6363431afd690fe0698560",
                  email: attrs.email,
                  name: schema.users.find(i).name
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
            username: attrs.name,
            email: attrs.email,
            password: attrs.password,
            DateOfBirth: attrs.DateOfBirth,
            gender: attrs.gender
          });

          //return a request for now that the operation of creating the user was a success
          return new Response(
            201,
            {},
            {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MTc3OSwiZXhwIjoxNTgzNTc1Mzc5fQ.vLNE0dCGYItCOl6dJl3-QOtqV2ZZ8zNDdc9jla76ijg",
              user: {
                _id: "5e6363431afd690fe0698560",
                email: attrs.email,
                name: attrs.name,
                __v: 0
              }
            }
          );
        });
    }
  });

  return server;
}
