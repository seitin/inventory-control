const zip = require('lodash/zip')
const attendancesQueries = require('src/queries/attendances.queries')
const basesQueries = require('src/queries/bases.queries')
const criticality = require('src/handlers/business/criticality')

const handler = (db) => (req, res) => {
  const period = parseInt(req.params.period || 14)
  const baseId = req.params.baseId

  const getExpectedCoverage = attendancesQueries.getExpectedCoverage(baseId, period, db)
  const getStorage = basesQueries.getBaseStorageById(baseId, db)

  const calculateCriticalities = (expectedConsumptions, baseStorages) => {
    return zip(expectedConsumptions, baseStorages)
      .map(([consumption, storage]) => {
        return ({
          storage,
          criticality: criticality.calculate(storage.storageAmount, consumption.expectedCoverage)
        })
      })
  }

  const mapResponse = ([expectedConsumptions, actual]) => ({
    data: calculateCriticalities(expectedConsumptions, actual)
  })

  return Promise.all([
    getExpectedCoverage,
    getStorage
  ]).then(mapResponse)
    .then((response) => res.send(response))
}

module.exports = {
  path: '/bases/:baseId/criticality',
  method: 'get',
  handler
}
