const path = require('path')
const AutoLoad = require('fastify-autoload')
const CORS = require('fastify-cors')
const MongoDB = require('fastify-mongodb')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.register(CORS, {
    origin: '*'
  })

  fastify.register(MongoDB, {
    forceClose: true,
    url: 'mongodb://localhost:27017/mydb'
  })
}
