// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import colors from 'vuetify/lib/styles/elements'
import { createVuetify, ThemeDefinition } from 'vuetify'

// const myCustomLightTheme = {
//   // dark: true,
//   colors: {
//     primary: '#8BC34A',
//     analog: '#649130',
//     shadow: '#304517',
//     footer: '#1c280d',
//     secondary: '#673AB7',
//     accent: '#FF9800',
//     error: '#f44336',
//     warning: '#FFC107',
//     info: '#2196F3',
//     success: '#4CAF50'
//   }
// }

export default createVuetify({
  theme: {
    // defaultTheme: 'myCustomLightTheme',
    themes: {
      light: {
        colors: {
        primary: '#8BC34A',
        analog: '#649130',
        shadow: '#304517',
        footer: '#1c280d',
        secondary: '#673AB7',
        accent: '#FF9800',
        error: '#f44336',
        warning: '#FFC107',
        info: '#2196F3',
        success: '#4CAF50'
        }
      },
      dark: {
        colors: {
            primary: '#2196F3',
            secondary: '#607D8B',
            accent: '#FFC107',
            error: '#f44336',
            warning: '#FFC107',
            info: '#2196F3',
            success: '#4CAF50'
      }
  }
      // myCustomLightTheme,
    }
  }
})
