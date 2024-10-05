// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{indigo.50}',
          100: '{indigo.100}',
          200: '{indigo.200}',
          300: '{indigo.300}',
          400: '{indigo.400}',
          500: '{indigo.500}',
          600: '{indigo.600}',
          700: '{indigo.700}',
          800: '{indigo.800}',
          900: '{indigo.900}',
          950: '{indigo.950}'
      }
  }
});


export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      EVRIM_API_URL: process.env.NUXT_EVRIM_API_URL,
      STRIPE_PUBLISHABLE_KEY: process.env.NUXT_STRIPE_PUBLISHABLE_KEY,
      STRIPE_MANAGEMENT_URL: process.env.NUXT_STRIPE_MANAGEMENT_URL
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@primevue/nuxt-module', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  primevue: {
    options: {
      inputVariant: 'filled',
      theme: {
          preset: MyPreset,
      }
    }
  }
})