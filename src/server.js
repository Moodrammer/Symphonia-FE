import { Server, Model, Response, JSONAPISerializer } from "miragejs";
import playlistJson from "./api/mock/data/playlist.json";
import trackJSON from "./api/mock/data/track.json";
import artistJSON from "./api/mock/data/artist.json";
import albumsJSON from "./api/mock/data/album.json";
import categoryJSON from "./api/mock/data/category.json";

//The makeserver function to be used to enable Mirage to intercept your requests
export function makeServer({ environment = "development" } = {}) {
    let server = new Server({
        environment,

        models: {
            user: Model,
            track: Model,
            bestsong: Model,
            playlist: Model,
            album: Model,
            artist: Model,
            soundplayer: Model,
            category: Model
        },

        seeds(server) {
            //creating a user for testing purposes
            server.create("user", {
                name: "Bobuser",
                email: "Bob@gmail.com",
                password: "12345678",
                DateOfBirth: "1980-12-12",
                gender: "male",
                type: "user",
                country: "EG"
            });
            //creating an artist for testing purposes
            server.create("user", {
                name: "artistic",
                email: "artist@gmail.com",
                password: "12345678",
                DateOfBirth: "1995-12-18",
                gender: "male",
                type: "artist",
                country: "EG"
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
            server.create("bestsong", {
                songs: [{
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
                server.create("track", element);
            });

            artistJSON.artists.items.forEach(element => {
                server.create("artist", element);
            });

            albumsJSON.items.forEach(element => server.create("album", element));

            categoryJSON.items.forEach(element => {
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
                    liked: true
                });
                return new Response(
                    200, {}, {
                        playlist: {
                            name: newPlaylist.name,
                            id: schema.playlists.find(schema.playlists.all().length).id,
                            description: null,
                            followers: {
                                href: null,
                                total: 0
                            },
                            href: "https://api.symphonia.com/v1/users/thelinmichael/playlists/" +
                                schema.playlists.find(schema.playlists.all().length).id,
                            images: [{
                                url: "http://source.unsplash.com/mp_FNJYcjBM"
                            }],
                            owner: {
                                href: "https://api.symphonia.com/v1/users/" + user_id,
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
                        }
                    }
                );
            });
            ///////////////////////////////////////////////////////////////////////////////////
            //Get a List of Current User's Playlists
            ///////////////////////////////////////////////////////////////////////////////////
            this.get("/v1/me/playlists", schema => {
                return schema.playlists.where({ liked: true }).models;
            });
            ///////////////////////////////////////////////////////////////////////////////////
            //Get a User's Saved Tracks                "Liked Songs"
            ///////////////////////////////////////////////////////////////////////////////////
            this.get("/v1/me/tracks", schema => {
                return schema.tracks.where({ liked: true }).models;
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
                    return schema.playlists.where({ genre: id }).models;
                }
            );
            ///////////////////////////////////////////////////////////////////////////////////
            //Get track
            ///////////////////////////////////////////////////////////////////////////////////
            this.get("/v1/users/track/:track_id", (schema, request) => {
                let trackId = request.params.track_id;
                return schema.tracks.where({ _id: trackId }).models;
            });
            ///////////////////////////////////////////////////////////////////////////////////
            //Check user's saved tracks
            ///////////////////////////////////////////////////////////////////////////////////
            this.get("/v1/me/tracks/contains", (schema, request) => {
                let trackId = request.queryParams.ids;
                return schema.tracks.where({ id: trackId }).models[0].liked;
            });
            ///////////////////////////////////////////////////////////////////////////////////
            //Remove User's Saved Tracks
            ///////////////////////////////////////////////////////////////////////////////////
            this.delete("/v1/me/tracks", (schema, request) => {
                let trackId = JSON.parse(request.requestBody)[0];
                schema.tracks.where({ id: trackId }).update({ liked: false });
                return new Response(200, {}, {});
            });
            ///////////////////////////////////////////////////////////////////////////////////
            //Save Tracks for User
            ///////////////////////////////////////////////////////////////////////////////////
            this.put("/v1/me/tracks", (schema, request) => {
                let trackId = JSON.parse(request.requestBody).data[0];
                schema.tracks.where({ id: trackId }).update({ liked: true });
                return new Response(200, {}, {});
            });
            ///////////////////////////////////////////////////////////////////////////////////
            //Get a Category
            ///////////////////////////////////////////////////////////////////////////////////
            this.get("v1/browse/categories/:category_id", (schema, request) => {
                let categoryID = request.params.category_id;
                return new Response(
                    200, {}, {
                        name: schema.categories.where({ id: categoryID }).models[0].name,
                        id: schema.categories.where({ id: categoryID }).models[0].id,
                        href: schema.categories.where({ id: categoryID }).models[0].href
                    }
                );
            });
            ///////////////////////////////////////////////////////////////////////////////////
            // this.urlPrefix = 'http://localhost:8080';

            this.get("/v1/me/albums", schema => {
                return schema.albums.all().models;
            });

            this.delete("/v1/me/albums", (schema, request) => {
                var x = "";

                for (var i = 2; i < request.requestBody.length - 2; i++)
                    x += request.requestBody[i];

                return schema.albums.findBy(album => album.album.id === x).destroy();
            });

            this.get("/v1/me/following", (schema, request) => {
                if (request.queryParams.type === "artist")
                    return schema.artists.all().models;
            });

            this.delete("/v1/me/following", (schema, request) => {
                if (request.queryParams.type === "artist") {
                    var x = "";
                    for (var i = 2; i < request.requestBody.length - 2; i++)
                        x += request.requestBody[i];

                    return schema.artists.findBy(artist => artist.id === x).destroy();
                }
            });

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
                                200, {}, {
                                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MzQ2MiwiZXhwIjoxNTgzNTc3MDYyfQ.P_nm8thbkOzKBnbpqkBL1_SuRzZxt5eFFFN0aZ6AbBQ",
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
                    return new Response(
                        400, {}, {
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
                            DateOfBirth: attrs.dateOfBirth,
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
                            201, {}, {
                                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MTc3OSwiZXhwIjoxNTgzNTc1Mzc5fQ.vLNE0dCGYItCOl6dJl3-QOtqV2ZZ8zNDdc9jla76ijg",
                                user: {
                                    _id: schema.users.find(schema.users.all().length).id,
                                    email: attrs.email,
                                    name: attrs.name,
                                    type: attrs.type,
                                    __v: 0
                                }
                            }
                        );
                    } else {
                        //return an error object if the email address already exists
                        return new Response(
                            400, {}, {
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
                        200, {}, {
                            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjM2MzQzMWFmZDY5MGZlMDY5ODU2MCIsImlhdCI6MTU4MzU3MTc3OSwiZXhwIjoxNTgzNTc1Mzc5fQ.vLNE0dCGYItCOl6dJl3-QOtqV2ZZ8zNDdc9jla76ijg",
                            user: {
                                _id: schema.users.find(resettoken).id,
                                email: schema.users.find(resettoken).email,
                                name: schema.users.find(resettoken).name,
                                type: schema.users.find(resettoken).type
                            }
                        }
                    );
                }),
                this.get("/v1/me/player/devices", () => {
                    return new Response(
                        200, {}, {
                            data: [{
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
                                },
                            ]
                        }
                    );
                }),

                this.get("/v1/me/player/currently-playing", () => {
                    return new Response(
                        200, {}, {
                            "data": {
                                "currentTrack": "/track/5e7d2dc03429e24340ff1396",
                                "device": "5e88ef4d54142e3db4d01ee5"
                            }
                        }
                    );
                }),
                // Get the current user's data to the account overview(User's Settings)
                this.get("/v1/users/me", (schema, request) => {
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
                //console.log(JSON.parse(request.requestBody));
                let attr = JSON.parse(request.requestBody);
                let currentUser = schema.users.find(attr.id);
                // check if the current user's entered password is equal that in the seed
                if (currentUser.password == attr.passwordCurrent) {
                    // if it's right change it with the new one
                    currentUser.update({ password: attr.password });
                    return new Response(201, {}, {});
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
                        DateOfBirth: attr.dateOfBirth
                    });

                    return new Response(201, {}, {});
                } else {
                    return new Response(401, {}, {});
                }
            });
        }
    });

    //server.shutdown();

    return server;
}