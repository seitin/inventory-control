const endpoint = require('src/handlers/status.handler')
const test = require('ava')

test('Tests if status endpoint returns database settings', t => {
  const db = {
    client: {
      readyForQuery: true
    }
  }
  const req = {}
  const res = {
    send: (response) => {
      t.is(response.databaseConnection, true)
    }
  }
  endpoint.handler(db)(req, res)
})

test('Tests if status endpoint returns 400 as status code when it\'s not connected on database', t => {
  const db = {
    client: {
      readyForQuery: false
    }
  }
  const req = {}
  const res = {
    status: (statusCode) => ({
      send: (response) => {
        t.is(statusCode, 400)
      }
    })
  }
  endpoint.handler(db)(req, res)
})
