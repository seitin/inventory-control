require('dotenv').config({ path: '.env.test' })
const chunk = require('lodash/chunk')
const database = require('src/database')
const fs = require('fs')
const {
  PSQL_PASSWORD,
  PSQL_USER,
  PSQL_HOST,
  PSQL_PORT,
  PSQL_DATABASE
} = process.env

const CSV_PATH = 'seed/csv/'
const SQL_PATH = 'seed/sql/'

const tables = [
  'expeditions',
  'country_states',
  'consumptions',
  'bases',
  'base_storage',
  'attendances'
]

const readFile = (path) => new Promise((resolve, reject) => fs.readFile(path, 'utf8', (err, content) => {
  if (err) {
    return reject(err)
  }
  return resolve(content)
}))

const fileExists = (path) => new Promise((resolve, reject) => fs.access(path, fs.F_OK, (err) => {
  if (err) {
    return resolve(false)
  }
  return resolve(true)
}))

function saveCSVIntoSQL (tablename, csv, db) {
  const listRows = chunk(csv.content)
  const insertValues = listRows.map(rows =>
    rows.map(row => {
      const values = row.filter(cell => cell)
        .map(cell => {
          const celltype = typeof cell
          if (celltype === 'string') {
            return `'${cell}'`
          } else if (celltype === 'undefined') {
            return null
          } else {
            return cell
          }
        }).join(',')
      return `(${values})`
    }).join(',')
  )

  const buildQuery = (values) => {
    const query = `
      INSERT INTO ${tablename}
      (${csv.header.join(',')})
      VALUES
      ${values}
    `
    return query
  }

  insertValues.map(buildQuery)
    .forEach(db.none)
}

async function insertCSVIntoTable (tablename, db) {
  const splitLinesIntoColumns = (lines) => lines.map(line => line.split(','))
  const splitTextIntoLines = (content) => content.split('\n')
  const getHeader = (list) => list[0]

  const toCSV = (text) => {
    const lines = splitTextIntoLines(text)
    const matrix = splitLinesIntoColumns(lines)
    const header = getHeader(matrix)
    const content = matrix.slice(1, matrix.length - 1)
    const result = {
      header,
      content
    }
    return result
  }
  const query = await readFile(SQL_PATH + tablename + '.sql')
  await db.none(`DROP TABLE IF EXISTS ${tablename} CASCADE`)
  await db.none(query)

  const csvExists = await fileExists(CSV_PATH + tablename + '.csv')
  if (csvExists) {
    const text = await readFile(CSV_PATH + tablename + '.csv')
    const csv = toCSV(text)
    await saveCSVIntoSQL(tablename, csv, db)
  }
}

const seed = async (db) => {
  for (const tablename of tables) {
    await insertCSVIntoTable(tablename, db)
  }
}
const clear = (db) => tables.map((tablename) => db.none(`DROP TABLE IF EXISTS ${tablename} CASCADE`))
const db = database.connect(PSQL_HOST, PSQL_USER, PSQL_PASSWORD, PSQL_PORT, PSQL_DATABASE)

module.exports = {
  db,
  seed: async (db) => await seed(db),
  clear: async (db) => await clear(db)
}
