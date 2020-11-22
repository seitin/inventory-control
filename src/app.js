const express = require('express')
const bodyParser = require('body-parser')
const routes = require('src/handlers/routes')
const database = require('src/database')

const {
  PSQL_PASSWORD,
  PSQL_USER,
  PSQL_HOST,
  PSQL_PORT,
  PSQL_DATABASE,
  PORT
} = process.env

function startServer () {
  const createExpressApp = (db) => ([express(), db])
  const registerEndpoints = ([app, db]) => {
    routes.registerEndpoints(app, db)
    return [app, db]
  }
  const addBodyParser = ([app, db]) => {
    app.use(bodyParser.urlencoded({ extended: true }))
    return [app, db]
  }
  const listenApp = ([app, db]) => app.listen(PORT, (err) => {
    if (err) {
      console.log(err)
      throw err
    }
    console.log(`Server running on http://localhost:${PORT}`)
  })
  return database.connect(PSQL_HOST, PSQL_USER, PSQL_PASSWORD, PSQL_PORT, PSQL_DATABASE)
    .then(createExpressApp)
    .then(addBodyParser)
    .then(registerEndpoints)
    .then(listenApp)
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
}

module.exports = {
  start: startServer
}
