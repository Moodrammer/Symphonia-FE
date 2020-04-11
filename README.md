# Symphonia FE 🎵
A Project that mimics the FrontEnd part of Spotify Web player.

___

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
npm run lint
```

## Runing on Mock server

For mocking we use **Mirage.js**
The server is established in **development** environment automatically and runs on the same port as the frontend code 
where it intercepts all the requests and api calls and mocks their responses through defined routes

## Runing on real server from localhost (for debugging temporarily)
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
3. From **src/components/TheSoundPlayer/TheSoundPlayer.vue** inside the **init** function prevent mocking by changing development to production as follows
```javascript
this.isMocking = process.env.NODE_ENV === "production";
```
note: switching from development to production is done manually while serving in development environment to let the conditions where the process.env = development fail ,but it should be changed in the next phase


## Runing on real server
When deployed in a **Production environment**, the **Mirage** server is not established and it doesn't intercept the calls to the api
The publicPath is taken form the domain name where the project runs

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
