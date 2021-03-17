import express from 'express'
import { S3Upload } from '../controllers/aws.controller'
const router = express.Router()

router.route('/upload:file')
  .get(
    S3Upload
  )

export default router
