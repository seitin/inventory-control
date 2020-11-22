const test = require('ava')
const criticality = require('src/handlers/business/criticality')

const testLowestTierValue = (t) => {
  const storageAmount = 19.1
  const expectedCoverage = 1
  const res = criticality.calculate(storageAmount, expectedCoverage)
  t.is(res.criticality, 'YELLOW')
}

const testHighestTierValue = (t) => {
  const storageAmount = 23
  const expectedCoverage = 1
  const res = criticality.calculate(storageAmount, expectedCoverage)
  t.is(res.criticality, 'YELLOW')
}

test('Test if sets criticality YELLOW for high storage amount', async t => {
  testHighestTierValue(t)
  testLowestTierValue(t)
})
