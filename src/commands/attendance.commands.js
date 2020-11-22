function insertAttendance (baseId, consumptionId, amount, db) {
  const query = `
    INSERT INTO attendances
    (base_id, consumption_id, amount)
    VALUES
    ('${baseId}', '${consumptionId}', ${amount})
  `
  return db.none(query)
}

module.exports = {
  insertAttendance
}
