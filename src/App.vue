declare module 'vue/types/vue' {
  interface Vue {
    $store: { state: any }
  }
}

<template>
  <v-app :theme="theme" style="touch-action: manipulation;">

    <v-app-bar>
      <router-link to="/"><v-app-bar-title v-if="!this.$store.state.user">Log in</v-app-bar-title></router-link>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <template v-slot:extension>
        <v-tabs align-with-title>
          <!-- <v-tab href="/hello">Home</v-tab> -->
            <router-link to="/landing"><v-tab variant="tonal">COVID-19</v-tab></router-link>
            <router-link to="/movies"><v-tab>Movies</v-tab></router-link>
            <!-- <router-link to="/wiki"><v-tab variant="tonal">Wiki</v-tab></router-link> -->
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
        <div v-html="legacySystemHTML"></div>
        <!-- <component :is="currentView" /> -->
        <router-view></router-view>
      </v-container>
      <v-spacer></v-spacer>
    </v-main>
    <!-- TODO lepsza obsługa widoczności maila -->
    <SendMail v-if="this.$store.state.user" :address="this.$store.state.user" />
    <v-text-field variant="plain" v-if="!this.$store.state.user" disabled>Log in to send mail </v-text-field>
    <VueFooter />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginModal from './components/LoginModal.vue'
import VueFooter from './components/VueFooter.vue'
import SendMail from './components/SendMail.vue'
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { mapState } from 'vuex'

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
    SendMail,
  },
  data () {
    return {
      theme: 'dark',
      currentPath: window.location.hash,
      userName:'lol',
      legacySystemHTML: `
        <html>
          <body>
            <MARQUEE><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e1c1e851-5311-4b6a-9152-25ceddb54472/ddwokyu-41d734e1-46c3-497e-9db1-fbb1281e21d2.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UxYzFlODUxLTUzMTEtNGI2YS05MTUyLTI1Y2VkZGI1NDQ3MlwvZGR3b2t5dS00MWQ3MzRlMS00NmMzLTQ5N2UtOWRiMS1mYmIxMjgxZTIxZDIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.UaY1dQpXAnYeAsstWpQugvvkxmLUviCzBCAjg_BKoZM" /></MARQUEE>
          </body>
        </html>
        `
    }
  },
  methods: {
    onClick () {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
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

<style scoped>
a{
  text-decoration: none;
  color: inherit;
}
</style>