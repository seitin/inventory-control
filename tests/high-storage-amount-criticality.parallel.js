const test = require('ava')
const criticality = require('src/handlers/business/criticality')

const testLowestTierValue = (t) => {
  const storageAmount = 23.1
  const expectedCoverage = 1
  const res = criticality.calculate(storageAmount, expectedCoverage)
  t.is(res.criticality, 'RED')
}

const testHighestTierValue = (t) => {
  const storageAmount = 20000
  const expectedCoverage = 1
  const res = criticality.calculate(storageAmount, expectedCoverage)
  t.is(res.criticality, 'RED')
}

test('Test if sets criticality RED for extremely high storage amount', async t => {
  testHighestTierValue(t)
  testLowestTierValue(t)
})
