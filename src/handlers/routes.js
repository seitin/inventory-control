const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

function registerEndpoints (app, db) {
  console.log(chalk.green('registering endpoints...'))
  const listFiles = (directory) => new Promise((resolve, reject) => fs.readdir(directory, (err, files) => {
    if (err) {
      return reject(err)
    }
    resolve(files)
  }))

  const handlersDirectory = __dirname
  const relativeHandlersDirectory = path.relative(process.cwd(), handlersDirectory)

  const verifyIsHandler = file => file.endsWith('.handler.js')
  const loadEndpointSettings = file => require(path.join(relativeHandlersDirectory, file))
  const registerEndpoint = (settings) => {
    console.log(chalk.green('registering endpoint with path:', settings.path))
    app[settings.method](settings.path, settings.handler(db))
  }

  return listFiles(handlersDirectory)
    .then(files => files.filter(verifyIsHandler))
    .then(files => files.map(loadEndpointSettings))
    .then(endpointSettings => endpointSettings.map(registerEndpoint))
}

module.exports = {
  registerEndpoints
}
