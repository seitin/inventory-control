const test = require('ava')
const sinon = require('sinon')
const endpoint = require('src/handlers/base-storage-criticality-by-consumption.handler')

test('Test if sets criticality RED for low storage amount', async t => {
  const db = {
    any: () => {}
  }
  const dbAnyStub = sinon
    .stub(db, 'any')
    .onCall(0)
    .returns(Promise.resolve([{
      consumptionPublicId: 2,
      publicBaseId: 1,
      expectedDailyConsumption: 12.2
    }, {
      consumptionId: 3,
      publicBaseId: 1,
      expectedDailyConsumption: 20
    }]))
    .onCall(1)
    .returns(Promise.resolve([{
      publicConsumptionId: 4,
      publicBaseId: 1,
      storageAmount: 10.0
    }, {
      publicConsumptionId: 3,
      publicBaseId: 1,
      storageAmount: 190.0
    }]))

  const req = {
    params: {
      period: 14,
      publicId: 1
    }
  }
  const res = {
    send: (response) => {
      t.is(response.criticalities[0].criticality, 'RED')
      t.is(response.criticalities[0].baseStorage.storageAmount, 10.0)
      t.is(response.criticalities[0].estimatedDaysStorage, 0.819672131147541)
      t.is(response.criticalities[1].criticality, 'RED')
      t.is(response.criticalities[1].baseStorage.storageAmount, 190.0)
      t.is(response.criticalities[1].estimatedDaysStorage, 9.5)
      sinon.assert.called(dbAnyStub)
      dbAnyStub.reset()
    }
  }
  await endpoint.handler({
    any: dbAnyStub
  })(req, res)
})
