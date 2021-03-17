import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import AwsS3 from './routes/aws.route'

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false })
)
app.use(cookieParser())

app.use('/aws', AwsS3)

app.use((req, res, next) => {
  next(createError(500))
})

export default app
