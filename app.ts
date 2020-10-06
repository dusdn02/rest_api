import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import v1Route from './routes/v1'

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false })
)
app.use(cookieParser())

app.use('/v1', v1Route)

app.use((req, res, next) => {
  next(createError(500))
})

module.exports = app
