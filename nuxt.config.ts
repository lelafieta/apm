import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
function defineNuxtConfig(arg0: {
  //...
  build: { transpile: string[] }; modules: ((_options: any, nuxt: any) => void)[]; vite: { vue: { template: { transformAssetUrls: Record<string, string[]> } } }
}) {
  throw new Error('Function not implemented.')
}

