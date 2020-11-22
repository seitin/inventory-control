const calculate = (actualStorage, storageAvgUsagePerDay) => {
  const estimatedCoverage = actualStorage / storageAvgUsagePerDay
  const result = {
    estimatedCoverage,
    actualStorage,
    storageAvgUsagePerDay
  }
  if (estimatedCoverage < 10) {
    result.criticality = 'RED'
  } else if (estimatedCoverage <= 14) {
    result.criticality = 'YELLOW'
  } else if (estimatedCoverage <= 18) {
    result.criticality = 'GREEN'
  } else if (estimatedCoverage <= 23) {
    result.criticality = 'YELLOW'
  } else {
    result.criticality = 'RED'
  }
  return result
}

module.exports = {
  calculate
}
