const basesQueries = require('src/queries/bases.queries')
const attendancesQueries = require('src/queries/attendances.queries')

const handler = (db) => async (req, res) => {
  const baseId = req.params.baseId
  const period = parseInt(req.params.period || 14)
  const consumptionId = req.params.consumptionId

  const getHighestStorageBase = basesQueries.getHighestStorageBase(consumptionId, db)

  const calculateCriticalities = (expectedConsumptions, baseStorages) => {
    return zip(expectedConsumptions, baseStorages)
      .map(([consumption, storage]) => {
        return ({
          storage,
          criticality: criticality.calculate(storage.storageAmount, consumption.expectedCoverage)
        })
      })
  }

  const getExpectedCoverage = (baseId) => attendancesQueries.getExpectedCoverage(baseId, period, db)

  // basesQueries.getBasesStorage(db)
  //   .then()

  // Promise.all([
  //   getActualCoverage,
  //   getHighestStorageBase
  // ]).then(([{ expectedDailyConsumption }, highestBase]) => {
}

module.exports = {
  path: '/expeditions/consumptions/:consumptionId/destination/:baseId/suggested',
  method: 'get',
  handler
}
