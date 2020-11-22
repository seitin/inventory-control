function getAverageStorageUsagePerPeriod (publicBaseId, period, db) {
  const query = `
    WITH last_period AS (
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
    ), average_storage_on_period AS (
      SELECT
        b.public_id as base_public_id,
        c.public_id as consumption_public_id,
        (SUM(a.amount) / ${period}.0) AS expected_daily_consumption
      FROM attendances a
      INNER JOIN bases b
        ON b.id = a.base_id
      INNER JOIN consumptions c
        ON c.id = a.consumption_id
      INNER JOIN last_period lp
        ON lp.base_id = a.base_id
        AND lp.consumption_id = a.consumption_id
        AND lp.end_date >= a.date
        AND lp.start_date <= a.date
      GROUP BY
        b.public_id, c.public_id
    )
    SELECT
      *
    FROM average_storage_on_period;
  `
  return db.any(query)
}

module.exports = {
  getAverageStorageUsagePerPeriod
}
