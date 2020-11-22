const test = require('ava')
const endpoint = require('src/handlers/base-storage-criticality-by-consumption.handler')
const seed = require('tests/helpers/database-seed')

test('Test if endpoint flow for criticality calculation', async t => {
  const db = await seed.db
  await seed.seed(db)
  const req = {
    params: {
      period: 14,
      publicId: '30d34474-d40b-43e6-8fdf-da5d76e8d101'
    }
  }
  const res = {
    send: (response) => {
      t.not(response.data[0].criticality, null)
      t.not(response.data[0].criticality, undefined)
    }
  }
  await endpoint.handler(db)(req, res)
})
