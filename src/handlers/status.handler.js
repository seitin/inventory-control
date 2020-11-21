const handler = (db) => (req, res) => {
  const status = {
    api: 'Ok',
    databaseConnection: db.client.readyForQuery
  }
  res.send(status)
}

module.exports = {
  path: '/status',
  method: 'get',
  handler
}
