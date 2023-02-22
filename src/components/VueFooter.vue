<template>
  <!-- <div color="primary"></div> -->
  <v-card color="primary">
    <v-footer color="primary" v-bind="localAttrs" :padless="padless">
      <v-card color="primary" flat tile width="100%" class="red lighten-1 text-center">
        <v-card-text>
          <v-row no-gutters>
            <v-col  cols="12" sm="4">
              <!-- <v-sheet class="ma-2 pa-2" color="primary">
                <v-alert
                  border="start"
                  density="default"
                  type="warning"
                  color="secondary"
                  closable
                >
                  Integrations like Send Mail are <strong>limited</strong> to 15/day,
                  today was made: <strong>{{ integrationsCounter.value }}</strong> times.
                </v-alert>
              </v-sheet> -->
            </v-col>
            <v-col cols="12" sm="4">
              <v-sheet class="ma-2 pa-2" color="primary">
                <v-btn
                  v-for="button in buttons"
                  :key="button"
                  class="mx-4"
                  icon
                  :href="button.link"
                  color="secondary"
                >
                  <v-icon size="24px">
                    {{ button.icon }}
                  </v-icon>
                </v-btn>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="4">
              <!-- <v-sheet class="ma-2 pa-2"> One of three columns </v-sheet> -->
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
// import requestCounter from '../helpers/requestCounter'
import firestore from '../fireconf'
import { mapState } from 'vuex';


export default {
  data: () => ({
    buttons: [
      {
        icon: "mdi-instagram",
        link: "https://www.instagram.com/just.mike99/",
      },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/in/micha%C5%82-jaro%C5%84-8a9679152/",
      },
    ],
    padless: false,
    variant: "default",
    integrationsCounter:{day:0, value:0}
  }),
  computed: {
    ...mapState(['counter']),

    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
  watch: {
    counter(newVal, oldVal) {
      // wykonywanie akcji w odpowiedzi na zmiany w myStoreValue
      this.setCounter();
    }
  },
  methods: {
    async setCounter(){
      this.integrationsCounter = await firestore.read();
    },
  },
  created(){
    this.setCounter()
  }
};
</script>
