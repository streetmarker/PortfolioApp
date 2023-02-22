// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import colors from 'vuetify/lib/styles/elements'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary:  "#E53935",
          secondary: "#FFCDD2"
          
        }
      },
    },
  },
})
