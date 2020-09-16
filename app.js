import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
// import indexRouter from '../src/routes/index';
import vlRoute from './routes/vl'

require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use('/', indexRouter);
app.use('/v1', vlRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  let apiError = err

  if (!err.status) {
    apiError = createError(err)
  }
  // set locals, only providing error in development
  res.locals.message = apiError.message
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}

  return res.status(apiError.status)
    .json({ message: apiError.message })
})

module.exports = app
