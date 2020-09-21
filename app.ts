require('dotenv').config()

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import moment from 'moment'
import response from './utils/response'
import v1Route from './routes/v1'

import jwtMiddleware from './middlewares/jwt.middleware'
import { logger, stream } from './configs/winston'

const app = express()

app.use(morgan('combined', { stream }))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(cookieParser())

// app.use(jwtMiddleware)

app.use('/v1', v1Route)

app.use((req, res, next) => {
  next(createError(500))
})

if (process.env.NODE_ENV === 'production') {
  // const sentry = require('@sentry/node')
  // sentry.init({ dsn: process.env.SENTRY_DSN })

  // app.use(sentry.Handlers.errorHandler())

  // const { IncomingWebhook } = require('@slack/client')
  // const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)
  // webhook.send({
  //   'attachments': [
  //     {
  //       'color': '#ff0000',
  //       'text': '에러 발생!!! 출근하라!!!',
  //       'fields': [
  //         {
  //           'title': err.message,
  //           'value': err.stack,
  //           'short': false
  //         }
  //       ],
  //       'ts': moment().unix()
  //     }
  //   ]
  // }, (err, res) => {
  //   if (err) {
  //     sentry.captureException(err)
  //   }
  //   })
}
app.use((err, req, res, next) => {
  let apiError = err

  if (!err.status) {
    apiError = createError(err)
  }

  if (process.env.NODE_ENV === 'production' && apiError.status > 499) {
    const errObj = {
      req: {
        headers: req.headers,
        query: req.query,
        body: req.body,
        route: req.route
      },
      error: {
        message: apiError.message,
        stack: apiError.stack,
        status: apiError.status
      },
      user: req.user
    }

    logger.error(`${moment().format('YYYY-MM-DD HH:mm:ss')}`, errObj)
  } else {
    res.locals.message = apiError.message
    res.locals.error = apiError
  }

  return response(
    res,
    {
      message: apiError.message
    },
    apiError.status
  )
})

module.exports = app