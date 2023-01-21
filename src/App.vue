<template>
  <v-app :theme="theme" style="touch-action: manipulation;">

    <v-app-bar>
      <v-app-bar-title v-if="!this.$store.state.user">LifeIsMeme</v-app-bar-title>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <template v-slot:extension>
        <v-tabs v-if="this.$store.state.user" align-with-title>
          <!-- <v-tab href="/hello">Home</v-tab> -->
            <v-tab variant="tonal"> <router-link to="/hello">Hello</router-link></v-tab>
            <v-tab><router-link to="/movies">Movies</router-link></v-tab>
            <v-tab variant="tonal"><router-link to="/wiki">Wiki</router-link></v-tab>
        </v-tabs>
      </template>
      <v-spacer/>
      <LoginModal v-if="this.$store.state.user" :name="this.calculateName"/>
      <v-btn v-if="this.$store.state.user" @click="this.$store.dispatch('logout')">Logout</v-btn>
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="onClick"
      ></v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <!-- <component :is="currentView" /> -->
        <router-view></router-view>
      </v-container>
      <v-spacer></v-spacer>
    </v-main>
    
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import LoginModal from './components/LoginModal.vue'
import MovieList from './components/MovieList.vue';
import WikiPage from './components/WikiPage.vue'
import Login from './components/LoginTmp.vue'
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
// const routes = {
//   '/': Login,
//   '/movies': MovieList,
//   '/hello': HelloWorld,
//   '/wiki': WikiPage,
// }
export default defineComponent({
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  },
  name: 'App',

  components: {
    LoginModal,
    // Wiki,
    // HelloWorld,
    // MovieList,
  },

  
  data () {
    return {
      theme: 'dark',
      currentPath: window.location.hash,
      userName:'lol'
    }
  },
  methods: {
    onClick () {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
  },
  computed: {
    calculateName() {
      return this.$store.state.user.email.slice(0,this.$store.state.user.email.indexOf('@'))
    }
    // currentView() {
    //   return routes[this.currentPath.slice(1) || '/']// || NotFound
    // }
  },
  mounted() {
    // window.addEventListener('hashchange', () => {
    //   this.currentPath = window.location.hash
		// })
  }
})
</script>
