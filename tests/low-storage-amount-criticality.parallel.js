const test = require('ava')
const criticality = require('src/handlers/business/criticality')

const testLowestTierValue = (t) => {
  const storageAmount = 0
  const expectedCoverage = 1
  const res = criticality.calculate(storageAmount, expectedCoverage)
  t.is(res.criticality, 'RED')
}

const testHighestTierValue = (t) => {
  const storageAmount = 9.9
  const expectedCoverage = 1
  const res = criticality.calculate(storageAmount, expectedCoverage)
  t.is(res.criticality, 'RED')
}

test('Test if sets criticality RED for low storage amount', async t => {
  testHighestTierValue(t)
  testLowestTierValue(t)
})
