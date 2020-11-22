const basesQueries = require('src/queries/bases.queries')
const attendancesQueries = require('src/queries/attendances.queries')

const handler = (db) => async (req, res) => {
  const basePublicId = req.params.basePublicId
  const period = parseInt(req.params.period || 14)
  const consumptionPublicId = req.params.consumptionPublicId

  const getAverageStorageUsage =  attendancesQueries.getAverageStorageUsagePerPeriod(basePublicId, period, db)
  const getHighestStorageBase = basesQueries.getHighestStorageBase(consumptionPublicId, db)

  Promise.all([
    getAverageStorageUsage,
    getHighestStorageBase
  ]).then(([{ expectedDailyConsumption }, highestBase]) => {
    
  })
}

module.exports = {
  path: '/expeditions/consumptions/:consumptionPublicId/destination/:basePublicId/suggested',
  method: 'get',
  handler
}
