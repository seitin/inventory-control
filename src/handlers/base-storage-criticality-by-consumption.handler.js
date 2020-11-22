const zip = require('lodash/zip')
const attendancesQueries = require('src/queries/attendances.queries')
const basesQueries = require('src/queries/bases.queries')

const handler = (db) => (req, res) => {
  const period = parseInt(req.params.period || 14)
  const publicId = req.params.publicId

  const getExpectedStorage = attendancesQueries.getAverageStorageUsagePerPeriod(publicId, period, db)
  const getActualStorage = basesQueries.getBaseStorageByPublicId(publicId, db)

  const calculateCriticalities = (expectedConsumptions, baseStorages) => zip(expectedConsumptions, baseStorages)
    .map(calculateCriticality)

  const calculateCriticality = ([expectedStorage, baseStorage]) => {
    const expectedDaily = expectedStorage.expectedDailyConsumption
    const actualAmount = baseStorage.storageAmount
    const estimatedDaysStorage = actualAmount / expectedDaily
    const result = {
      estimatedDaysStorage,
      baseStorage,
      expectedDaily
    }
    if (estimatedDaysStorage < 10) {
      result.criticality = 'RED'
    } else if (estimatedDaysStorage <= 14) {
      result.criticality = 'YELLOW'
    } else if (estimatedDaysStorage <= 18) {
      result.criticality = 'GREEN'
    } else if (estimatedDaysStorage <= 23) {
      result.criticality = 'YELLOW'
    } else {
      result.criticality = 'RED'
    }
    return result
  }

  const mapResponse = ([expectedConsumptions, actual]) => ({
    criticalities: calculateCriticalities(expectedConsumptions, actual)
  })

  return Promise.all([
    getExpectedStorage,
    getActualStorage
  ]).then(mapResponse)
    .then((response) => res.send(response))
    .catch(err => {
      console.log(err.stack)
      res.status(400).send(err)
    })
}

module.exports = {
  path: '/bases/:publicId/criticality',
  method: 'get',
  handler
}
