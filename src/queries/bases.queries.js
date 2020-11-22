function getBaseStorageByPublicId (publicId, db) {
  const query = `
    SELECT
      b.public_id as base_public_id,
      c.public_id as consumption_public_id,
      bs.storage_amount as storage_amount
    FROM
      base_storage bs
    INNER JOIN consumptions c
      ON bs.consumption_id = c.id
    INNER JOIN bases b
      ON b.id = bs.base_id
    WHERE 
      b.public_id = '${publicId}'
  `
  return db.any(query)
}

function getBasesStorage (db) {
  const query = `
    SELECT
      b.public_id AS base_public_id,
      c.public_id AS consumption_public_id,
      bs.storage_amount
    FROM
      base_storage bs
    INNER JOIN consumptions c
      ON bs.consumption_id = c.id
    INNER JOIN bases b
      ON bs.base_id = b.id
  `
  return db.any(query)
}

function getHighestBaseStorage (publicConsumptionId, db) {
  const query = `
    SELECT
      bs.consumption_id,
      bs.base_id,
      bs.storage_amount
    FROM
      base_storage bs
    INNER JOIN consumptions c
    ON c.id = bs.consumption_id
    WHERE
      c.public_id = '${publicConsumptionId}'
    ORDER BY
      bs.storage_amount DESC
    LIMIT 1
  `
  return db.one(query)
}

module.exports = {
  getBaseStorageByPublicId,
  getBasesStorage,
  getHighestBaseStorage
}
