const Hapi = require('hapi')
const Path = require('path')
const http = require('http')

require('env2')('./config.env')

const key = process.env.JUST_GIVING_API_KEY
const host = process.env.JUST_GIVING_BASE_URL
const port = process.env.PORT

const options = (endpoint) => {
  return {
    host,
    path: endpoint,
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
      'x-api-key': key
    }
  }
}

const makeRequest = (opts, reply) => {
  return http.request(opts, (res) => {
    let d = ''
    res.on('data', (chunk) => {
      d += chunk
    })

    res.on('end', () => {
      reply(d)
    })
  })
}

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
    path: '/categories',
    handler: (request, reply) => {
      const opts = options('/v1/charity/categories')
      const req = makeRequest(opts, reply)
      req.end()
    }

  },
  {
    method: 'GET',
    path: '/charities/{categoryId}',
    handler: (request, reply) => {
      const opts = options('/v1/charity/search?categoryId=' + request.params.categoryId)
      const req = makeRequest(opts, reply)
      req.end()
    }
  },
  {
    method: 'GET',
    path: '/urls/{charityId}',
    handler: (request, reply) => {
      const opts = options('/v1/charity/' + request.params.charityId)
      const req = makeRequest(opts, reply)
      req.end()
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
