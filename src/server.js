import { Server , Model, Response, JSONAPISerializer} from "miragejs"

//The makeserver function to be used to enable Mirage to intercept your requests
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      //creating some users to test login page
      server.create("user", { email: "Bob@gmail.com" , password: "12345678" })
      server.create("user", { email: "Alice@gmail.com" , password: "123456789" })
    },

    //Define serializers to format the responses
    serializers: {
      application: JSONAPISerializer
    },

    routes() {
      // this.urlPrefix = 'http://localhost:8080';
      this.namespace = '/api';

      //this.get("/search", schema => {
        
        //return schema.users.all()
         
      
      //})
      this.post("/v1/users/login", (schema, request) => {
        //turn attributes to json to be able to access the data of the request
        let attrs = JSON.parse(request.requestBody);
        if(schema.users.find(1).email == attrs.email && schema.users.find(1).password == attrs.password){
          return new Response(
            200,{},
            {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MzQ2MiwiZXhwIjoxNTgzNTc3MDYyfQ.P_nm8thbkOzKBnbpqkBL1_SuRzZxt5eFFFN0aZ6AbBQ",
              user: {
                  _id: "5e6363431afd690fe0698560",
                  email: attrs.email,
                  name:  "Bobuser"
                }
            }
          )
        }
        else{
          return new Response(
            400, {}, {}
      )
        }
      })

    },
  })

  return server
}