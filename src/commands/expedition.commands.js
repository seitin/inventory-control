function insertExpedition (source, destination, consumptionId, amount, db) {
  const query = `
    INSERT INTO expeditions
    (source_base_id, destination_base_id, consumption_id, amount)
    VALUES
    ('${source}', '${destination}', '${consumptionId}', ${amount})
  `
  return db.none(query)
}

module.exports = {
  insertExpedition
}
