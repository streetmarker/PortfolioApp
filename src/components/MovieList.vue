<template>
    <v-row align="center" justify="center">
      <ActorsList/>
    <v-col cols="10" sm="6" md="2">
      <!-- <v-text-field variant="solo">Searched today: {{ this.counterObj.value }}</v-text-field> -->
    </v-col>
      <v-col cols="10" sm="8" md="6">
        <v-card class="elevation-12" >
              <v-card-title style="background-color: #00BFA5;">🍿 Serch for a movie</v-card-title>
                <v-form ref="form" @submit.prevent="searchMovies" >
                    <v-text-field placeholder="Type here" :rules="titleRule" label="Film title" :counter="3" type="text" v-model="query" required />
                    <v-card-actions>
                        <v-btn color="secondary" type="submit">Search</v-btn>
                    </v-card-actions>
                    <div v-if="process.env.NODE_ENV==='development'">
                      <v-btn @click="getData()">GET</v-btn>
                    <v-btn @click="increment()">POST</v-btn>
                    </div>

                    <v-alert v-if="this.counterObj.value>=this.limit" type="error">Daily limit reached :(</v-alert>
                </v-form>
            </v-card>
        </v-col>
        <v-col cols="10" sm="6" md="2">
      <!-- <v-text-field variant="solo">Searched today: {{ this.counterObj.value }}</v-text-field> -->
    </v-col>
    </v-row>
    <v-container>
      <!-- <v-row align="center" justify="center"> -->
        <div class="card-grid">
        <!-- <v-col cols="12" sm="8" md="4"> -->
          <v-card class="card" v-for="movie in this.$store.state.movies" :key="movie.title">
            <v-toolbar color="secondary" dark>
              <v-toolbar-title>{{ movie.title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>{{ movie.year }}</v-card-text>
            <v-card-text>{{ movie.titleType }}</v-card-text>
            <v-img v-if="movie.image" :src="movie.image.url" fill-height></v-img>
            <v-img v-else-if="!movie.image" src="https://micras.org/wiki/images/7/78/Image_placeholder.jpg"></v-img>
          </v-card>
        <!-- </v-col> -->
      </div>
      <!-- </v-row> -->
    </v-container>
</template>

<script>
import firestore from '../fireconf'
import { useStore } from "vuex";
import ActorsList from './ActorsList.vue'

export default {
  components:{
    ActorsList
  },
  data: () => ({
      query: "",
      tmpMovies:[],
      movies:[],
      error: '',
      counter: 0,
      counterObj: {day:0,value:0},
      day:0,
      titleRule: [
        v => !!v || 'This is required',
        v => v.length >= 3 || 'Title length at least 3 characters',
      ],
      limit:15,
    }),
    setup() {
    useStore();

  },
  methods: {
    async searchMovies() {
      if(this.counterObj.value<this.limit && this.query.length>3){
        await this.$refs.form.validate();
        this.increment();

        const options = {
          method: "GET",
          url: "https://online-movie-database.p.rapidapi.com/title/v2/find",
          params: { title: this.query, limit: '10', sortArg: 'moviemeter,asc' },
          headers: {
            "X-RapidAPI-Key": process.env.VUE_APP_RAPIDAPI_KEY,
            "X-RapidAPI-Host": process.env.VUE_APP_RAPIDAPI_HOST_OMD,
          },
        };

        const response = await this.$http
          .request(options)
          .then(function (response) {
            // console.log(response.data);
            return response.data.results;
          })
          .catch(function (error) {
            console.error(error);
            return error;
          });
      try{
          this.tmpMovies = response;
          // console.log(this.movies);
      }  catch(e){
          this.error = response;
      }
      this.$store.commit('catchMovies', this.tmpMovies); // save to Store
    }
    },
    async increment() {
      this.$store.commit('incrementNum');
      firestore.write(this.counterObj.day == new Date().getDate() ? this.$store.state.counter : 0, new Date().getDate())
      this.getData()
    },
    async getData(){
      this.counterObj = await firestore.read()
      this.$store.state.counter = this.counterObj.value
    },
  },
  computed: {
    //
  },
  watch: {
    //
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  justify-content: center;
  justify-items: center;
}

.card {
  width: 100%;
  width: calc(50% - 8px);
  margin: 8px;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
}

.movie-item {
  width: 300px;
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: hidden;
}

.movie-item img {
  width: 100%;
  height: auto;
}

.movie-info {
  padding: 20px;
}

.movie-info h3 {
  margin: 0;
  font-size: 18px;
}

.movie-info p {
  margin: 10px 0;
  font-size: 14px;
  color: #666;
}
</style>
