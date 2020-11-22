const handler = (db) => async (req, res) => {
  const databaseConnection = db.client.readyForQuery
  const status = {
    api: 'Ok',
    databaseConnection
  }
  if (databaseConnection) {
    res.send(status)
  } else {
    res.status(400).send(status)
  }
}

module.exports = {
  path: '/status',
  method: 'get',
  handler
}
