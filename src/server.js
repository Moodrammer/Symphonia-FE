import { Server } from "miragejs";

//The makeserver function to be used to enable Mirage to intercept your requests
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment

    //Leaving the user model as a reference example to be removed later

    //models: {
    //user: Model,
    //},

    //seeds(server) {
    //server.create("user", { name: "Bob" })
    //server.create("user", { name: "Alice" })
    //},

    //routes() {
    //this.urlPrefix = 'https://api.edamam.com';

    //this.get("/search", schema => {

    //return schema.users.all()

    //})
    //},
  });

  return server;
}
