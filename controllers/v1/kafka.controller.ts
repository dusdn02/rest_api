// eslint-disable-next-line no-unused-vars
import response from '../../utils/response'
const { Kafka } = require('kafkajs')

var kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: ['15.165.31.68:9092']
})

const producer = kafka.producer()

const send = async (req, res, next) => {
  try {
    await producer.connect()

    console.log('send함수')

    await producer.send({
      topic: 'test.lora',
      messages: [{
        key: null,
        value: 'test-messages'
      }]
    })

    response(res)
  } catch (e) {
    console.log(e)
    next(e)
  }
}

// eslint-disable-next-line camelcase
export { send }
