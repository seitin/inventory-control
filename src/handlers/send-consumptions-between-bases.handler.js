const expeditionCommands = require('src/commands/expedition.commands')
const baseCommands = require('src/commands/base.commands')

const handler = (db) => (req, res) => {
  const {
    source,
    destination,
    consumptionId,
    amount
  } = req.body

  const insertConsumption = expeditionCommands.insertExpedition(source, destination, consumptionId, amount, db)
  const updateBasesStorage = baseCommands.updateBaseStorage(source, destination, consumptionId, amount, db)

  return Promise.all([
    insertConsumption,
    updateBasesStorage
  ]).then(res.status(201).send())
}

module.exports = {
  path: '/expeditions/send',
  handler,
  method: 'post'
}
