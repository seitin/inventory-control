const test = require('ava')
const endpoint = require('src/handlers/send-consumptions-between-bases.handler')
const seed = require('tests/helpers/database-seed')

test.serial('Test if endpoint to send expeditions', async t => {
  const db = await seed.db
  await seed.seed(db)
  const req = {
    body: {
      source: '942fa9b0-ec82-4e07-8c4c-fe5b26a596df', // Lagoinha BA - 49 storage
      destination: '67b68acb-72ad-455f-bb10-c3af289b7141', // Alfenas MG - 33 storage
      amount: 10,
      consumptionId: 'b18910b2-f472-4c2a-9424-30ed7335528f'
    }
  }
  const res = {
    status: (statusCode) => ({
      send: (response) => {
        t.is(statusCode, 201)
        t.is(response, undefined)
      }
    })
  }
  await endpoint.handler(db)(req, res)
  const [updatedStorageSource, updatedStorageDestination] = await Promise.all([
    db.one(`SELECT base_id, storage_amount FROM base_storage WHERE base_id = '${req.body.source}' AND consumption_id = '${req.body.consumptionId}'`),
    db.one(`SELECT base_id, storage_amount FROM base_storage WHERE base_id = '${req.body.destination}' AND consumption_id = '${req.body.consumptionId}'`)
  ])
  t.is(updatedStorageSource.storageAmount, 39)
  t.is(updatedStorageDestination.storageAmount, 43)
})
