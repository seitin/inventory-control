// const basesQueries = require('src/queries/bases.queries')
// const attendancesQueries = require('src/queries/attendances.queries')

const handler = (db) => async (req, res) => {
  const basePublicId = req.params.basePublicId
  const period = parseInt(req.params.period || 14)
  const consumptionPublicId = req.params.consumptionPublicId

  const getHighestStorageBase = basesQueries.getHighestStorageBase(consumptionPublicId, db)

  const calculateCriticalities = (expectedConsumptions, baseStorages) => {
    return zip(expectedConsumptions, baseStorages)
      .map(([consumption, storage]) => {
        return ({
          storage,
          criticality: criticality.calculate(storage.storageAmount, consumption.expectedCoverage)
        })
      })
  }
  
  const getExpectedCoverage = (basePublicId) => attendancesQueries.getExpectedCoverage(basePublicId, period, db)
  
  // basesQueries.getBasesStorage(db)
  //   .then()

  // Promise.all([
  //   getActualCoverage,
  //   getHighestStorageBase
  // ]).then(([{ expectedDailyConsumption }, highestBase]) => {
}

module.exports = {
  path: '/expeditions/consumptions/:consumptionPublicId/destination/:basePublicId/suggested',
  method: 'get',
  handler
}
