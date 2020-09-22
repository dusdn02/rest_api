import * as fs from 'fs'
import * as path from 'path'

const Sequelize = require('sequelize')
const config = require(path.join(__dirname, '../configs/sequelize'))[
  process.env.NODE_ENV
]
const basename = path.basename(__filename)

const models = {} as any
let sequelize = {} as any

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-9) === '.model.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    models[model.name] = model
  })

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
