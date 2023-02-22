declare module 'vue/types/vue' {
  interface Vue {
    $store: { state: any }
  }
}

<template>
  
  
  <!-- <v-layout style="height: 50px">
  <v-system-bar color="primary">
    <v-icon icon="mdi-wifi-strength-4" class="ms-2"></v-icon>

    <v-icon icon="mdi-signal-cellular-outline" class="ms-2"></v-icon>

    <v-icon icon="mdi-battery" class="ms-2"></v-icon>

    <span class="ms-2">08:30</span>
  </v-system-bar>
</v-layout> -->
<v-app :theme="theme" style="touch-action: manipulation;">
  <!-- <div v-bind:class="{ 'status-bar': true }">
    <v-icon icon="mdi-wifi-strength-4" class="ms-2"></v-icon>

<v-icon icon="mdi-signal-cellular-outline" class="ms-2"></v-icon>

<v-icon icon="mdi-battery" class="ms-2"></v-icon>

<span class="ms-2">08:30</span>
  </div> -->
    <!-- Reszta treści aplikacji Vue -->
  

    <v-navigation-drawer
    location='right'
    image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    v-model="drawer">
    <v-list nav>
          <v-list-item prepend-icon="mdi-hospital"><router-link to="/landing">COVID-19 Report</router-link></v-list-item>
          <v-list-item prepend-icon="mdi-movie"><router-link to="/movies">Movies</router-link></v-list-item>
          <v-list-item prepend-icon="mdi-comment"><router-link to="/overallComm">Comments</router-link></v-list-item>
          <v-list-item prepend-icon="mdi-wrench-outline" title="Soon ..."></v-list-item>
          <v-list-item prepend-icon="mdi-wrench-outline" title="Soon ..."></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-link to="/movies"></router-link>
    
    <v-app-bar color="primary">
      <!-- <template v-slot:extension>
        <v-tabs align-with-title>
          <router-link to="/landing"><v-tab>COVID-19</v-tab></router-link>
          <router-link to="/movies"><v-tab>Movies</v-tab></router-link>
        </v-tabs>
      </template> -->
      <!-- <v-spacer/> -->
      <v-spacer/>
      <router-link to="/"><v-app-bar-title style="color: rgb(45, 194, 0); padding-left:30px;" v-if="!this.$store.state.user"><v-btn color="success" variant="flat">Log in</v-btn></v-app-bar-title></router-link>
      <LoginModal v-if="this.$store.state.user" :name="this.calculateName"/>
      <v-btn v-if="this.$store.state.user" @click="this.$store.dispatch('logout')">Logout</v-btn>
      <v-btn
      :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      @click="onClick"
      ></v-btn>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
      <v-spacer></v-spacer>
    </v-main>
    <VueFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginModal from './components/LoginModal.vue'
import VueFooter from './components/VueFooter.vue'
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { mapState } from 'vuex';
import firestore from './fireconf';

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
    VueFooter,
  },
  data () {
    return {
      theme: 'dark',
      drawer: null,
    }
  },
  methods: {
    onClick () {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    async clearFirestoreCounter(){
      const counterObj = await firestore.read();
      if(counterObj.day != new Date().getDate()){
        firestore.write(0, new Date().getDate())
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state
    }),
    calculateName() {
      return this.$store.state.user.email.slice(0,this.$store.state.user.email.indexOf('@'))
    },
    mail() {
      return this.$store.state.user.email ? this.$store.state.user.email : "";
    }
  },
  mounted() {
    this.clearFirestoreCounter();
  }
})
</script>

<style scoped>
a{
  text-decoration: none;
  color: inherit;
}
main{
  background-color: #8D6E63;
}
.status-bar {
  background-color: blue;
  color: hwb(106 0% 24%);
}

</style>