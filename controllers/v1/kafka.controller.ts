import { Kafka, EachMessagePayload } from 'kafkajs'
import response from '../../utils/response'
const moment = require('moment')

var kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: ['15.165.31.68:9092']
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: process.env.CLIENT_ID })

const send = async (req: any, res: any, next: any) => {
  try {
    await producer.connect()

    var temp: any[] = []

    console.log('kafkacontroller send 실행')

    await producer.send({
      topic: 'test.lora',
      messages: [{
        key: null,
        value: JSON.stringify({
          timestamp: moment().format('YYYY-MM-DD hh:mm:ss'),
          value: 'test-messages'
        })
      }]
    })

    response(res, temp)
  } catch (e) {
    next(e)
  }
}
consum()
var temp: any[] = []
async function consum () {
  await consumer.connect()
  await consumer.subscribe({
    topic: 'test.lora'
  })

  console.log('kafkacontroller messages 실행')

  await consumer.run({
    eachMessage: async ({ message }: EachMessagePayload) => {
      if (message.value) {
        var data = JSON.stringify(message.value.toString())
        console.log(data)
        temp.push(data)
      } else {
        temp.pop()
      }
    }
  })
}

const messages = async (req: any, res: any, next: any) => {
  try {
    // console.log('temp에 값이' + temp)

    response(res, temp)
  } catch (e) {
    next(e)
  }
}

export { send, messages }
