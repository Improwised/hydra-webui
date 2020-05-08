const { Nuxt, Builder } = require('nuxt')
const URL = process.env.URL || "http:"
// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js')
config.proxy =  {
  '/clients': URL
};
const nuxt = new Nuxt(config)
// app.use(nuxt.render)

// Build only in dev mode
// if (config.dev) {
  new Builder(nuxt).build()
// }
  
// Listen the server
// app.listen(35801)