// eslint-disable-next-line no-unused-vars
const { kafkajs, Kafka } = require('kafkajs')

const send = async (req, res, next) => {
  try {
    var kafka = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: ['15.165.31.68:9092']
    })

    const producer = kafka.producer()

    await producer.connect()

    console.log('send함수')

    await req.this.producer.send({
      topic: 'test.lora',
      messages: 'test-messages'
    })

    return
  } catch (e) {
    next(e)
  }
}

// eslint-disable-next-line camelcase
export { send }
