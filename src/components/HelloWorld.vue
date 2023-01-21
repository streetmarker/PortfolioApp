<template>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark>
                <v-toolbar-title>Czy kawusia będzie dziś smaczna?</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="sage" style="text-align:center;font-size:50px">{{ obj.answer == "yes" ? "TAK !" : obj.answer == "maybe" ? "?MOŻE?" : "NIE !" }}</v-card-text>
              <v-img
                    :lazy-src="lazyScreen.replace(/\s+/g, '')"
                    :src="obj.image"
              ></v-img>
              <v-divider></v-divider>
              <v-card-actions>
                <!-- <v-btn color="primary" @click="auth()">About {{ this.user }}</v-btn> -->
                <v-btn color="secondary" @click="getPhoto()">Sprawdź jeszcze raz</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row> 
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
// import firebaseui from '../auth'

export default defineComponent({
  name: 'HelloWorld',

  components:{
    //
  },

  data () {
    return {
      lazyScreen: `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/67401945-34fc-46b8-8e8f-1982847277d4/ddba22b-2fad9d00
      -1d3f-4ec8-a65d-199a09dfa4e1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZD
      QxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY3NDAxOTQ1LTM0
      ZmMtNDZiOC04ZThmLTE5ODI4NDcyNzdkNFwvZGRiYTIyYi0yZmFkOWQwMC0xZDNmLTRlYzgtYTY1ZC0xOTlhMDlkZmE0ZTEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZX
      J2aWNlOmZpbGUuZG93bmxvYWQiXX0.p1RcYkkOBXh0fzpoZxaTbE1_xNWLfoLqEZv1_0utuzU`,
      obj:{
        "answer": "",
        "forced": false,
        "image": ""
      },
      user:{}
    }
  },
  methods: {
    async getPhoto () {
      // for(let i =0; i<10000;i++){
      const response = await this.$http.get(
        "https://yesno.wtf/api");
      this.obj = response.data;
      console.log(process.env.apiKey)
      // if(response.data.answer=="maybe")break;
      // }
    },
    // auth() {
    //   this.user = auth
    //   // return auth.signInWithPopup
    // }
  },
  mounted() {
    this.getPhoto();
    // console.log(firebaseui)
  }
})
</script>
<style scoped>
  @font-face {
    font-family: 'SageUI';
    src: url('../assets/Segoe\ UI\ Bold.ttf') format('ttf');
        /* url('fonts/SageUI-Regular.woff') format('woff'); */
    font-weight: 400;
    font-style: normal;
  }

  .sage {
    font-family: 'SageUI'
    /* , sans-serif; */
  }
</style>