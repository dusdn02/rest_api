import express from 'express'
import { send } from '../../controllers/v1/auth.controller'

const router = express.Router()

router.route('/send').get(send)

export default router
