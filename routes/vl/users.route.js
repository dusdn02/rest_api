import express from 'express'
import { get } from '../../controllers/vl/user.controller'

const router = express.Router()

router.route('/')
  .get(
    get
  )

export default router
