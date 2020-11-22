const test = require('ava')
const sinon = require('sinon')
const endpoint = require('src/handlers/base-storage-criticality-by-consumption.handler')

test('Test if sets criticality GREEN for optimal storage amount', async t => {
  const db = {
    any: () => {}
  }
  const dbAnyStub = sinon
    .stub(db, 'any')
    .onCall(0)
    .returns(Promise.resolve([{
      consumptionPublicId: 2,
      publicBaseId: 1,
      expectedDailyConsumption: 1.2
    }, {
      consumptionId: 3,
      publicBaseId: 1,
      expectedDailyConsumption: 1
    }]))
    .onCall(1)
    .returns(Promise.resolve([{
      publicConsumptionId: 4,
      publicBaseId: 1,
      storageAmount: 20.0
    }, {
      publicConsumptionId: 3,
      publicBaseId: 1,
      storageAmount: 14.1
    }]))

  const req = {
    params: {
      period: 14,
      publicId: 1
    }
  }
  const res = {
    send: (response) => {
      t.is(response.criticalities[0].criticality, 'GREEN')
      t.is(response.criticalities[1].criticality, 'GREEN')
      sinon.assert.called(dbAnyStub)
      dbAnyStub.reset()
    }
  }
  await endpoint.handler({
    any: dbAnyStub
  })(req, res)
})
