import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'portfolioTheme',

    themes: {
      portfolioTheme: {
        dark: false,

        colors: {
          background: '#EFEBCE',
          surface: '#EFEBCE',
          primary: '#37a749',
          primary_accent: '#2F9100',
          secondary: '#B02E0C',
          onSurface: '#1d1b20',
          background_accent: '#D0CCB3',
        },
      },
    },
  },
})
