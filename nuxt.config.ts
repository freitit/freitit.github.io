export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'FREITIT - Tools',
      meta: [
        { name: 'description', content: 'Container number utilities and tools' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/tools']
    }
  },
  ssr: false,
  target: 'static'
})