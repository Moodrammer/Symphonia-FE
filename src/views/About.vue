<template>
  <v-app>
    <navBar />
    <v-content>
      <v-container fluid>
        <div class="container">
          <!-- the main container to the side bad & view router -->
          <div style="padding: 25px;"></div>
          <h1>About US</h1>
          <v-row style="margin-bottom: 8rem;">
            <v-col cols="7" style="padding-top:200px;">
              <p>
                We at Symphonia aim to give our user the best experience s/he
                deserves.
              </p>
              <p>
                With Symphonia, it’s easy to find the right music or podcast for
                every moment – on your phone, your computer, your tablet and
                more.
              </p>
            </v-col>
            <v-col cols="5">
              <v-avatar size="400" style="padding:2rem">
                <img
                  src="https://www.shareicon.net/data/512x512/2015/11/06/667992_users_512x512.png"
                />
              </v-avatar>
            </v-col>
          </v-row>
          <h1>Our Stuff</h1>
          <v-card shaped style="width:100%; margin-bottom:10rem;">
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <h3
                    style="margin-top:11rem; font-size:28px; border-left: 3px; margin-left:5rem;"
                  >
                    Symphonia consists of 5 teams
                  </h3>
                </v-col>
                <v-col cols="6">
                  <v-list shaped avatar flat nav rounded>
                    <v-subheader style="font-size:28px;">Teams</v-subheader>
                    <v-list-item-group color="primary">
                      <v-list-item href="#leader">
                        <v-list-item-avatar>
                          <v-img
                            src="https://cdn0.iconfinder.com/data/icons/web-development-22/256/web_building-512.png"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>Leader + DevOps</v-list-item-title>
                          <v-list-subtitle>2 members</v-list-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item href="#testing">
                        <v-list-item-avatar>
                          <v-img
                            src="https://static.thenounproject.com/png/82952-200.png"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>Testing</v-list-item-title>
                          <v-list-subtitle>3 members</v-list-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item href="#frontEnd">
                        <v-list-item-avatar>
                          <v-img
                            src="https://cdn4.iconfinder.com/data/icons/technology-83/1000/app_frontend_end_front_front-end_front_end_development-512.png"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>Front-End</v-list-item-title>
                          <v-list-subtitle>5 members</v-list-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item href="#backEnd">
                        <v-list-item-avatar>
                          <v-img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIlKFgy33A62o-nX8910N8pVWh_46sZ2ebdvq0xDd8ytm9zLCi&usqp=CAU"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>Back-End</v-list-item-title>
                          <v-list-subtitle>4 members</v-list-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item href="#android">
                        <v-list-item-avatar>
                          <v-img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACQkJDh4eFWVlYTExO+vr7n5+fNzc2xsbHr6+u6urq0tLShoaHw8PDo6OhOTk74+PgfHx+IiIjY2NhycnKZmZk7OztBQUFdXV0ICAjGxsbLy8upqakvLy9kZGR8fHxsbGwcHBx+fn4nJyc0NDQqjnx8AAAD9UlEQVR4nO2d2XaqMBRAiWOdRbFOtdYO//+LV3AKCRUQXCfp3fvBJTELzzaQkBBiEAAAAAAAAAAAAAAAAAAAAAAAAAAAeEH3SXmdYapUs2DWplLTp8byFDpKqVXBvKtj3u1To3kGb8eo1aBQ1kGc9eXJ8TyBaRy3mRiOu+PQTIwzeniUxieXUo3b5nDemqkTs9Z8eDtHG3FS0VPWKT7iyPvJ22iuLDbzKPmsH298yIVZgTAOfX98s3u3/RLed8dP9/E768j1g1Ec+3b0i96J0TZ+3UmH+iifd+VuzKQDfZiXgoYethRn/rzh/TNQx9PzcFFYUKmFdLCPcCghqNRBOtzylBP0sBQbJQWVepUOuRwDLfSvKNpltYyfuyj60LY70kGXoa8Ffrr6XFqCp86j3qCMJUMuyco6+JqW4eT0gXY4e9SDGtkiwY8huDyn6+pDqYDLMtZNLofe2jBcZ2X2pYuhVx/n0zAI2oZh+5we6YlzqZDLkSqVS1kNlMl5DKeVSvSjEI3+fNKU24Ln1sG4tGvc37UjmCab/cKsZk4sF/uNkdTO3708WcVVHB+GTVv5Gnfw4Qq8kqA9wuoe24qGUf5XCJMxMlqKkbRALtOKhuv8rxDGrP/L8i4tkMc43yEH1y9ronyFHFzvJVatSt2vTDuVDd27qhl3o8lt62XaqsZUGwCfRF35Y3Z7ah2+6o+kf+pmToWH/A/Xg6vYLfviDK97Fh1J1UacVK/WPe+0Pbdq3XMp0ldoya34sFmVpD1MNzpi/eJuuhJMfupqvcOYpOu/SqdJ1TevRmzxrITqrUVsaI6uSl2OrzJiq8ewZ6TthQzNAcLX2gzN+zrfjhg2nmYoNUCFIYYYYoghhhhiiCGGGGKIIYYYYoghhhhiiCGGGGKIIYYYYnjh24ijvnvA5gwBqXvAeyOObW2G5vw/qfnt5nyCsDbD0EgTe+QrHcZXUJth+tEpwQn8KZ2NnfS4YboQBSdk6nVes07D1LQv0SeEr5O8VueJWXUZBv2lkSBFOFq31XLxdtmuzfBYoR5+1Gy/c21me42GjoIhhhjKgyGGGMqDIYYYyoOh/4Y1PffkMN1ewtBaUbAx7OkMreXORucMvix83TcFzEdBrVUj+yJxPk63tKEvZXcBQwzdB0MM3QdDDN0HQwzdB0MM3QdDDN3n74/TWAu1mgshWT+BSJRVMBbbtedPGnM33V/V08SYQGn/z4oxovqWsQ/HSRVi1qqkqUL0rwiDINTXas2qRvTq1s9/fAqvC+7+ZNeTk+u/lbVcm7xWlE7iuPp9vcFdMgGx5frNmLv0JzkZJt61gwAAAAAAAAAAAAAAAAAAAAAAAADwX/MP1Es8sOsVS9kAAAAASUVORK5CYII="
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>Android</v-list-item-title>
                          <v-list-subtitle>3 members</v-list-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-row
              justify="center"
              align="center"
              style="margin-bottom: 10rem;"
            >
              <v-col cols="6" id="leader">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #08AEEA;background-image: linear-gradient(0deg, #08AEEA 0%, #2AF598 100%);"
                  >
                    <!-- src="https://gradients.design/public/uploads/files/v16.png" -->

                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/boy.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Muhammed Sayed</v-list-item-title
                            >
                            <v-list-item-subtitle>Leader</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #08AEEA;background-image: linear-gradient(0deg, #08AEEA 0%, #2AF598 100%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/boy.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Ahmed Atia</v-list-item-title
                            >
                            <v-list-item-subtitle>DevOps</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-lazy>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-row
              justify="center"
              align="center"
              style="margin-bottom: 10rem;"
            >
              <v-col cols="4" id="testing">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #8EC5FC;background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/girl.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Shaza Elbably</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Testing member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #8EC5FC;background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/girl.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Aya Adel</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Testing leader</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #8EC5FC;background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/girl.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Areej Raafat</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Testing member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-lazy>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-row justify="center" align="center" style="margin-bottom: 5rem;">
              <v-col cols="4" id="frontEnd">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #21D4FD;background-image: linear-gradient(9deg, #21D4FD 0%, #B721FF 50%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/girl.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Eman Othman</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Front-End member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #21D4FD;background-image: linear-gradient(9deg, #21D4FD 0%, #B721FF 50%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/mahmoudAmr.png"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Mahmoud Amr</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Front-End leader</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #21D4FD;background-image: linear-gradient(9deg, #21D4FD 0%, #B721FF 50%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/boy.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Mohamed Hassainin Omran</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Front-End member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-lazy>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-row
              justify="center"
              align="center"
              style="margin-bottom: 10rem;"
            >
              <v-col cols="6">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #21D4FD;background-image: linear-gradient(9deg, #21D4FD 0%, #B721FF 50%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/David.png"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >David Raafat</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Front-End member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #21D4FD;background-image: linear-gradient(9deg, #21D4FD 0%, #B721FF 50%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/Saad.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Saad Badr</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Front-End member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-lazy>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-row justify="center" align="center" style="margin-bottom: 5rem;">
              <v-col cols="4" id="backEnd">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #52ACFF;background-image: linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/alaa.png"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Mohamed Alaa</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Back-End member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #52ACFF;background-image: linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/etch.png"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Muhammed Ahmed</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Back-End leader</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #52ACFF;background-image: linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/ibrahim.png"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Mohamed Ibrahim</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Back-End member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-lazy>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-row
              justify="center"
              align="center"
              style="margin-bottom: 10rem;"
            >
              <v-col cols="12">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background-color: #52ACFF;background-image: linear-gradient(180deg, #52ACFF 25%, #FFE32C 100%);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/omar.png"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Omar Tarek</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Back-End member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-lazy>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-row justify="center" align="center" style="margin-bottom: 5rem;">
              <v-col cols="4" id="android">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background: #373B44;background: -webkit-linear-gradient(to right, #4286f4, #373B44);background: linear-gradient(to right, #4286f4, #373B44);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/boy.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Khaled Ali</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Android member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background: #373B44;background: -webkit-linear-gradient(to right, #4286f4, #373B44);background: linear-gradient(to right, #4286f4, #373B44);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/Hossam.png"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Hossam Alaa</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Android leader</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background: #373B44;background: -webkit-linear-gradient(to right, #4286f4, #373B44);background: linear-gradient(to right, #4286f4, #373B44);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/boy.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Islam Ahmed</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Android member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-lazy>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="200"
            transition="fade-transition"
          >
            <v-row
              justify="center"
              align="center"
              style="margin-bottom: 10rem;"
            >
              <v-col cols="12">
                <v-card class="mx-auto" max-width="350" tile shaped>
                  <v-img
                    height="100%"
                    style="background: #373B44;background: -webkit-linear-gradient(to right, #4286f4, #373B44);background: linear-gradient(to right, #4286f4, #373B44);"
                  >
                    <v-row align="end" class="fill-height">
                      <v-col align-self="start" class="pa-0" cols="12">
                        <v-avatar
                          class="profile"
                          color="grey"
                          size="164"
                          style="margin-left:6rem;margin-top:2rem;"
                        >
                          <v-img src="../assets/stuff/boy.jpg"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item color="rgba(0, 0, 0, .4)" dark>
                          <v-list-item-content>
                            <v-list-item-title class="title"
                              >Mahmoud Amr</v-list-item-title
                            >
                            <v-list-item-subtitle
                              >Android member</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-lazy>
        </div>
      </v-container>
    </v-content>
    <appFooter />
  </v-app>
</template>

<script>
import navBar from "../components/Homepage/TheHomepageNavigationBar.vue";
import appFooter from "../components/Homepage/TheHomepageFooter.vue";
export default {
  data() {
    return;
  },
  components: {
    navBar: navBar,
    appFooter: appFooter
  }
};
</script>

<style scoped>
@font-face {
  font-family: Circular;
  src: url("https://sp-bootstrap.global.ssl.fastly.net/8.12.4/fonts/circular-book.woff2")
      format("woff2"),
    url("https://sp-bootstrap.global.ssl.fastly.net/8.12.4/fonts/circular-book.woff")
      format("woff");
  font-style: normal;
  font-weight: 400;
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
body {
  font-family: Circular, Helvetica, Arial, sans-serif, IosFix;
  font-size: 18px;
  line-height: 1.5;
  color: #222326;
}
h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0.5em 0 0.25em;
  font-size: 48px;
}
p {
  margin: 0.5em 0 1em;
  text-align: justify;
  padding-left: 1rem;
}
</style>
