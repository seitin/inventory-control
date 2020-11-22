function updateBaseStorage (source, destination, consumptionId, amount, db) {
  const decreaseSource = () => {
    const query = `
      UPDATE base_storage
      SET storage_amount = storage_amount - ${amount}
      WHERE base_id = '${source}'
    `
    return db.none(query)
  }

  const increaseSource = () => {
    const query = `
      UPDATE base_storage
      SET storage_amount = storage_amount + ${amount}
      WHERE base_id = '${destination}'
    `
    return db.none(query)
  }

  return Promise.all([
    decreaseSource(),
    increaseSource()
  ])
}

module.exports = {
  updateBaseStorage
}
