async function getExpectedCoverage (baseId, period, db) {
  const query = `
    WITH dates as (
    SELECT
      base_id,
      consumption_id,
      MAX(date) AS end_date,
      MAX(date) - INTERVAL '${period} DAYS' AS start_date
    FROM attendances
    WHERE base_id = '${baseId}'
    GROUP BY
      base_id,
      consumption_id
    ), coverages as (
    SELECT
      a.base_id,
      a.consumption_id,
      (SUM(a.amount) / ${period}.0) AS expected_coverage
    FROM attendances a
    INNER JOIN dates d
      ON d.base_id = a.base_id
      AND d.consumption_id = a.consumption_id
      AND a.date >= d.start_date
      AND a.date <= d.end_date
    GROUP BY
      a.base_id, a.consumption_id
    )
    SELECT
      *
    FROM coverages
  `
  const result = await db.any(query)
  return result
}

module.exports = {
  getExpectedCoverage
}
