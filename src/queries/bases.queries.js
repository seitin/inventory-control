function getBaseStorageById (id, db) {
  const query = `
    SELECT
      base_id,
      consumption_id,
      storage_amount
    FROM
      base_storage
    WHERE 
      base_id = '${id}'
  `
  return db.any(query)
}

function getBasesStorage (db) {
  const query = `
    SELECT
      base_id,
      consumption_id,
      storage_amount
    FROM
      base_storage bs
  `
  return db.any(query)
}

function getHighestBaseStorage (consumptionId, db) {
  const query = `
    SELECT
      bs.consumption_id,
      bs.base_id,
      bs.storage_amount
    FROM
      base_storage bs
    WHERE
      consumption_id = '${consumptionId}'
    ORDER BY
      bs.storage_amount DESC
    LIMIT 1
  `
  return db.one(query)
}

module.exports = {
  getBaseStorageById,
  getBasesStorage,
  getHighestBaseStorage
}
