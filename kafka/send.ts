// eslint-disable-next-line no-unused-vars
const { kafkajs, Kafka } = require('kafkajs')
const schedule = require('node-schedule')

const send = async (req, res, next) => {
  var kafka = new Kafka({
    clientId: process.env.CLIENT_ID,
    brokers: ['15.165.31.68:9092']
  })

  const producer = kafka.producer()

  await producer.connect()

  console.log('send함수')

  var rule = new schedule.RecurrenceRule()
  rule.second = [0, 30]

  schedule.scheduleJob(rule, async function () {
    await req.this.producer.send({
      topic: 'test.lora',
      messages: 'test-messages'
    })
  })
}

// eslint-disable-next-line camelcase
export default send
