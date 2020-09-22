<<<<<<< HEAD
import fs from 'fs'
import path from 'path'

const Sequelize = require('sequelize')
const config = require(__dirname + '/../configs/sequelize.js')[process.env.NODE_ENV]
const basename = path.basename(__filename)

const models = {}
let sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '.model.js'))
  .forEach(file => {
=======
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
>>>>>>> 46b4a754e74cbe95dea570a4a6fe187e269439f7
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    models[model.name] = model
  })

<<<<<<< HEAD
Object.keys(models).forEach(modelName => {
=======
Object.keys(models).forEach((modelName) => {
>>>>>>> 46b4a754e74cbe95dea570a4a6fe187e269439f7
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

<<<<<<< HEAD
export {
  models
}
=======
export default models
>>>>>>> 46b4a754e74cbe95dea570a4a6fe187e269439f7
