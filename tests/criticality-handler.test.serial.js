const test = require('ava')
const endpoint = require('src/handlers/base-storage-criticality-by-consumption.handler')
const seed = require('tests/helpers/database-seed')

test.serial('Test if endpoint flow for criticality calculation', async t => {
  const db = await seed.db
  await seed.seed(db)
  const req = {
    params: {
      period: 14,
      baseId: '942fa9b0-ec82-4e07-8c4c-fe5b26a596df'
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
