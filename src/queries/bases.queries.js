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

module.exports = {
  getBaseStorageById
}
