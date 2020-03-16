import { Server  } from "miragejs";


//The makeserver function to be used to enable Mirage to intercept your requests
export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    seeds(server) {
    server.db.loadData({
    playlist: [
    { 
       'name' : "playlist1"
    }
    ]})
    }, 
    routes(){
      this.post("/api/playlists",(schema,request) => {
        let newPlaylist= JSON.parse(request.requestBody).data;
        return schema.db.playlist.insert({
          'name':newPlaylist
        })
      });
      this.get("/api/playlists",  schema => {
        return schema.db.playlist
      });
    },
     
    
  });

  return server;
}
