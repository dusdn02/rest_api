import express from 'express'
import { send, messages } from '../../controllers/v1/kafka.controller'

const router = express.Router()

router.route('/send').get(send)
router.route('/messages').get(messages)

export default router
