const test = require('ava')
const criticality = require('src/handlers/business/criticality')

const testLowestTierValue = (t) => {
  const storageAmount = 14.1
  const expectedCoverage = 1
  const res = criticality.calculate(storageAmount, expectedCoverage)
  t.is(res.criticality, 'GREEN')
}

const testHighestTierValue = (t) => {
  const storageAmount = 18
  const expectedCoverage = 1
  const res = criticality.calculate(storageAmount, expectedCoverage)
  t.is(res.criticality, 'GREEN')
}

test('Test if sets criticality GREEN for optimal storage amount', async t => {
  testHighestTierValue(t)
  testLowestTierValue(t)
})
