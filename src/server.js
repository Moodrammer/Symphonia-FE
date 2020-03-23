import { Server, Model, Response, JSONAPISerializer } from "miragejs";

//The makeserver function to be used to enable Mirage to intercept your requests
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
      track: Model
    },

    seeds(server) {
      //creating some users to test login page
      server.create("user", {
        name: "Bobuser",
        email: "Bob@gmail.com",
        password: "12345678",
        DateOfBirth: "12-12-1980",
        gender: "male",
        id: 1
      });

      server.create("track", {
        artists:
        {
          href: "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCguejur",
          id: "6sFIWsNpZYqfjUpaCguejuf",
          name: "Carly Rae Jepsenq",
        },
        duration_ms: 20795,
        name: "Cutqq",
        id: "11dFghVXANMlKmJXsNCbNlq",
        href: "https://api.symphonia.com/v1/tracks/11dFghVXANMlKmJXsNCbNlw",
        album:
        {
          id: "0tGPJ0bkWOUmH7MEOR77qcs",
          name: "Heaven22"
        }
      });

      server.create("track", {
        artists:
        {
          href: "https://api.spotify.com/v1/artists/6sFIWsNpZYqfjUpaCgueju",
          id: "6sFIWsNpZYqfjUpaCgueju",
          name: "Carly Rae Jepsen",
        },
        duration_ms: 207959,
        name: "Cut To The Feeling",
        id: "11dFghVXANMlKmJXsNCbNl",
        href: "https://api.symphonia.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",
        album:
        {
          id: "0tGPJ0bkWOUmH7MEOR77qc",
          name: "Heaven"
        }
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

      this.get("/v1/me/tracks", (schema) => {
        console.log(schema.users.all())
        return schema.tracks.all().models
      });

      // this.urlPrefix = 'http://localhost:8080';

      //this.get("/search", schema => {

      //return schema.users.all()

      //})
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
