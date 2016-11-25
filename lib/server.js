const Hapi = require('hapi')
const Path = require('path')

const port = 4000

const server = new Hapi.Server()

server.connection({ port })

server.register(require('inert'), (err) => {
  if (err) throw err

  server.route([{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file(Path.join(__dirname, '..', 'App', 'index.html'))
    }
  },
  {
    method: 'GET',
    path: '/{filename}.js',
    handler: (request, reply) => {
      reply.file(Path.join(__dirname, '..', 'App', request.params.filename + '.js'))
    }
  },
  {
    method: 'GET',
    path: '/{filename}.css',
    handler: (request, reply) => {
      reply.file(Path.join(__dirname, '..', 'App', 'style', request.params.filename + '.css'))
    }
  }
  ])

})

server.start((err) => {
  if (err) throw err
  console.log('server running at ' + server.info.uri)
})
