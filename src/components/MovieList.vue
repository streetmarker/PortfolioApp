<template>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
              
                <v-form ref="form" @submit.prevent="searchMovies" >
                    <v-text-field :rules="titleRule" label="Film title" :counter="3" type="text" v-model="query" required />
                    <v-card-actions>
                        <v-btn color="secondary" type="submit">Search</v-btn>
                    </v-card-actions>
                    <!-- {{ this.$store.state.counter }} -->
                    <!-- <p :v-bind="getData()"></p> -->
                    <!-- {{ this.$store.state.counter }} -->
                    <div v-if="this.env==='development'">
                      <v-btn @click="getData()">GET</v-btn>
                    <v-btn @click="increment()">POST</v-btn>
                    </div>

                    <v-alert v-if="this.counterObj.value>=this.limit" type="error">Daily limit reached :(</v-alert>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
    Searched today: {{ this.counterObj.value }}
    <v-container>
      <!-- <v-row align="center" justify="center"> -->
        <div class="card-grid">
        <!-- <v-col cols="12" sm="8" md="4"> -->
          <v-card class="card" v-for="movie in movies" :key="movie.Title">
            <v-toolbar color="primary" dark>
              <v-toolbar-title>{{ movie.Title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>{{ movie.Year }}</v-card-text>
            <v-card-text>{{ movie.Type }}</v-card-text>
            <v-img :src="movie.Poster" height="300"></v-img>
          </v-card>
        <!-- </v-col> -->
      </div>
      <!-- </v-row> -->
    </v-container>
</template>

<script>
import firestore from '../fireconf'

export default {
  data: () => ({
    // return {
      query: "",
      movies: [],
      error: '',
      counter: 0,
      counterObj: {day:0,value:0},
      day:0,
      titleRule: [
        v => !!v || 'This is required',
        v => v.length >= 3 || 'Title length at least 3 characters',
      ],
      limit:15,
      env: `${process.env.NODE_ENV}`
    }),
  // },
  methods: {
    async searchMovies() {
      if(this.counterObj.value<this.limit && this.query.length>3){
        await this.$refs.form.validate();
        this.increment();

        const options = {
          method: "GET",
          url: "https://movie-database-alternative.p.rapidapi.com/",
          params: { s: this.query, r: "json", page: "1" },
          headers: {
            "X-RapidAPI-Key":
              "c760435012msh8d411278365a25ap1b49cfjsnc37ca6960a24",
            "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
          },
        };

        const response = await this.$http
          .request(options)
          .then(function (response) {
            // console.log(response.data.Search);
            return response.data.Search;
          })
          .catch(function (error) {
            console.error(error);
            return error;
          });
      try{
          this.movies = response;
          console.log(this.movies);
      }  catch(e){
          this.error = response;
      }
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
    this.getData()
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
