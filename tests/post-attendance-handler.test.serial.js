const test = require('ava')
const endpoint = require('src/handlers/post-attendances.handler')
const seed = require('tests/helpers/database-seed')

test.serial('Test if endpoint insert attendance', async t => {
  const db = await seed.db
  await seed.seed(db)
  const req = {
    body: {
      baseId: '67b68acb-72ad-455f-bb10-c3af289b7141',
      consumptionId: 'b18910b2-f472-4c2a-9424-30ed7335528f',
      amount: 99999
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
  const insertedAttendance = await db.one(`
    SELECT
      CASE
        WHEN COUNT(1) = 1
        THEN true
        ELSE false
        END AS exists
    FROM attendances
    WHERE 
      base_id = '${req.body.baseId}'
      AND consumption_id = '${req.body.consumptionId}'
      AND amount = ${req.body.amount}
  `)
  t.is(insertedAttendance.exists, true)
})
