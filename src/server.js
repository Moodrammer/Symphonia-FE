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
      server.create("user", { username: "Bob" , password: "12345678" })
      server.create("user", { username: "Alice" , password: "123456789" })
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
        let attrs = JSON.parse(request.requestBody);
        if(schema.users.find(1).username == attrs.email && schema.users.find(1).password == attrs.password){
          return new Response(
            200,{token: "12345"},{user: {username: "bob" ,email: "Bob@gmail.com" }}
          )
        }
        else{
          return new Response(
            404, {}, {}
      )
        }
      })

    },
  })

  return server
}