import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from './store/store';
import { register } from './registerServiceWorker'
// import * as dotenv from 'dotenv'

loadFonts()
register
// dotenv.config() // .config()

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app')

