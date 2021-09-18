<img height="200" alt="symphonia logo" src="https://github.com/Moodrammer/Symphonia-FE/blob/master/public/slogo.png"></img>
  
[![GitHub contributors](https://img.shields.io/github/contributors/Moodrammer/Symphonia-FE)](https://github.com/Moodrammer/Symphonia-FE/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/Moodrammer/Symphonia-FE)](https://github.com/Moodrammer/Symphonia-FE/stargazers)


# Symphonia FE 🎵
A Project that mimics the FrontEnd part of Spotify Web player.

[Video Demo](https://drive.google.com/file/d/1LH4QnwInvntVBSGwDsYmIcJ60ITtzAe3/view?usp=sharing)
___
# Tools used
- Vue js : **js framework**
- Vuetify: **Components Library**
- Vue router: **routing**
- Vuex: **State Mangement**
- Mirage js: **Mock server**
- firebase: **Notifications**
- jest: **Unit testing**
- Vue Styleguidist: **Functional Documtentation**
- vue-context: **context menu**

# Main commands for running the Project

## Project setup & installing packages
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
  Runs the project by default on port:8080

### Compiles and minifies for production
```
npm run build
```
  The project is found in a **/dist** folder under the same directory after building

### Run your unit tests and generating coverage report
```
npm run test:unit
```
  This command runs all the unit tests and generates a coverage report index.html including details about all components 
  The generated coverage report is found in the project directory under **/coverage/Icov-report**

### Generate Functional documentation report
```
npm run styleguide:build
```
  To generate the report under **/styleguide** folder in the project directory

### Lints and fixes files
```
npm run lint --fix
```

## Running on Mock server

For mocking we use **Mirage.js**
The server is established in **development** environment automatically and runs on the same port as the frontend code 
where it intercepts all the requests and api calls and mocks their responses through defined routes

## Running on real server from localhost (for debugging temporarily)
some changes should be made in the development env :
1. prevent mirage from runing by changing the condition in **main.js** from development to production
```javascript
  if (process.env.NODE_ENV === "production") {
  makeServer();
}
```
2. define the axios base url to direct the calls to the deployed back end server in **main.js**
```javascript
axios.defaults.baseURL = "https://thesymphonia.ddns.net/api";
```


## Running on real server
When deployed in a **Production environment**, the **Mirage** server is not established and it doesn't intercept the calls to the api
The publicPath is taken form the domain name where the project runs

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
