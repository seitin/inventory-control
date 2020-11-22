async function getCoverage (publicBaseId, period, db) {
  const query = `
    WITH dates as (
    SELECT
      base_id,
      consumption_id,
      MAX(date) AS end_date,
      MAX(date) - INTERVAL '${period} DAYS' AS start_date
    FROM attendances a
    INNER JOIN bases b
      ON a.base_id = b.id
    WHERE b.public_id = '${publicBaseId}'
    GROUP BY
      base_id,
      consumption_id
    ), coverages as (
    SELECT
      b.public_id as base_public_id,
      c.public_id as consumption_public_id,
      (SUM(a.amount) / ${period}.0) AS expected_coverage
    FROM attendances a
    INNER JOIN bases b
      ON b.id = a.base_id
    INNER JOIN consumptions c
      ON c.id = a.consumption_id
    INNER JOIN dates d
      ON d.base_id = a.base_id
      AND d.consumption_id = a.consumption_id
      AND a.date >= d.start_date
      AND a.date <= d.end_date
    GROUP BY
      b.public_id, c.public_id
    )
    SELECT
      *
    FROM coverages
  `
  const result = await db.any(query)
  return result
}

module.exports = {
  getCoverage
}
