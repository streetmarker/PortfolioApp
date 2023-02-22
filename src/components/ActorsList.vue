<template>
    <div>
        <div v-if="process.env.NODE_ENV==='development'">
            {{ this.counterObj }}
        </div>
        <v-btn
        @click="bornTodayIds"
        stacked
        variant="plain"
        :disabled="disable">
        GET RANDOM ACTOR BORN TODAY {{ String(new Date().getDate()) }}/{{ String(new Date().getMonth()+1) }}</v-btn>
        <v-progress-linear
        v-if="waiting"
        indeterminate
        color="secondary"
        ></v-progress-linear>
        <v-card v-if="bornTodayActor.name">
            <v-card-title>{{ bornTodayActor.name }}</v-card-title>
            <v-card-subtitle v-if="bornTodayActor.akas">aka {{ bornTodayActor.akas[0] }}</v-card-subtitle>
            <br>
            <v-img fill-height :src="bornTodayActor.image.url"></v-img>
            <v-card-actions>
                <ActorModal :actor="bornTodayActor"/>
                <ActorFilms :movies="actorMovies" :waiting="waitingMovies"/>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import ActorModal from './ActorModal.vue'
import ActorFilms from './ActorFilms.vue'
import firestore from '../fireconf'

export default {
    name: 'LifeIsMemeActorsList',
    components:{
        ActorModal,
        ActorFilms
    },
    data: () => ({
        bornTodayActor:{},
        counterObj: {day:0,value:0},
        waiting:false,
        waitingMovies:false,
        disable:false,
        tmpActorId:'',
        actorMovies:[],
    }),

    mounted() {
        this.getCounter();
    },

    methods: {
        async getCounter(){
            this.counterObj = await firestore.readMovieNew()
            if(this.counterObj.value >= 400){ // API LIMIT
                this.disable = true;
            }
            if( new Date().getDate() == 16 ){ // reset on 16th
                firestore.writeMovieNew(0, new Date().getDate())
            }
        },
        async bornTodayIds(){ // req 3x
            this.waiting=true;
            this.waitingMovies=true;
        firestore.writeMovieNew(this.counterObj.value + 3, new Date().getDate()) // count+=3 on firestore
        const options = {
          method: "GET",
          url: 'https://online-movie-database.p.rapidapi.com/actors/list-born-today',
          params: { month: String(new Date().getMonth()+1), day: String(new Date().getDate()) },
          headers: {
            "X-RapidAPI-Key": process.env.VUE_APP_RAPIDAPI_KEY,
            "X-RapidAPI-Host": process.env.VUE_APP_RAPIDAPI_HOST_OMD,
          },
        };

        const response = await this.$http
          .request(options)
          .then((response) => {
            // console.log(response.data);
            this.getActor(response.data); // next api call
            return response.data;
          })
          .catch(function (error) {
            console.error(error);
            return error;
          });
        },

        async getActor(arr){
            this.tmpActorId = arr[Math.floor(Math.random()*20)].split('/')[2];
            const options = {
            method: "GET",
            url: 'https://online-movie-database.p.rapidapi.com/actors/get-bio',
            params: { nconst: this.tmpActorId },
            headers: {
                "X-RapidAPI-Key": process.env.VUE_APP_RAPIDAPI_KEY,
                "X-RapidAPI-Host": process.env.VUE_APP_RAPIDAPI_HOST_OMD,
            },
            };

            const response = await this.$http
            .request(options)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
                return error;
            });
            
            this.bornTodayActor = response;
            this.waiting=false;
            this.getActorMovies();
            this.getCounter(); // update counter
        },

        async getActorMovies(){
            // firestore.writeMovieNew(this.counterObj.value + 1, new Date().getDate()) // count++ on firestore
            const options = {
            method: 'GET',
            url: 'https://online-movie-database.p.rapidapi.com/actors/get-all-filmography',
            params: { nconst: this.tmpActorId },
            headers: {
                "X-RapidAPI-Key": process.env.VUE_APP_RAPIDAPI_KEY,
                "X-RapidAPI-Host": process.env.VUE_APP_RAPIDAPI_HOST_OMD,
            }
            };
            const response = await this.$http
            .request(options)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
                return error;
            });
            this.actorMovies = response.filmography;
            this.waitingMovies=false;
            this.getCounter();
        }
    },
};
</script>

<style lang="scss" scoped>

</style>