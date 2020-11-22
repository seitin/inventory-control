function camelizeColumnNames (data) {
  if (data.length <= 0) {
    return
  }
  var names = Object.keys(data[0])
  var camels = names.map(n => {
    return humps.camelize(n)
  })
  data.forEach(d => {
    names.forEach((n, i) => {
      var c = camels[i]
      if (!(c in d)) {
        d[c] = d[n]
        delete d[n]
      }
    })
  })
}

var options = {
  receive: function (data) {
    camelizeColumnNames(data)
  }
}

var humps = require('humps')
var pgp = require('pg-promise')(options)

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
