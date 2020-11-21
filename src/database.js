const pgp = require('pg-promise')({})

function connect (host, user, password, port) {
  console.log('Database connecting...')
  const db = pgp({
    user,
    host,
    password,
    port
  })
  return db.connect()
}

module.exports = {
  connect
}
