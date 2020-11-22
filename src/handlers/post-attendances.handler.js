const attendanceCommands = require('src/commands/attendance.commands')

const handler = (db) => (req, res) => {
  const {
    baseId,
    consumptionId,
    amount
  } = req.body
  return attendanceCommands.insertAttendance(baseId, consumptionId, amount, db)
    .then(() => res.status(201).send())
}

module.exports = {
  path: '/attendances',
  method: 'post',
  handler
}
