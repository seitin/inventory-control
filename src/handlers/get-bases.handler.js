const basesQueries = require('src/queries/bases.queries')

const handler = (db) => async (req, res) => {
  basesQueries.getBasesStorage(db)
    .then(response => res.send(response))
}

module.exports = {
  path: '/bases',
  method: 'get',
  handler
}
