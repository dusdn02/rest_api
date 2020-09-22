import * as fs from 'fs'
import winston from 'winston'

// eslint-disable-next-line no-path-concat
const logDir = __dirname + '/../logs'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const infoTransport = new winston.transports.File({
  filename: 'info.log',
  dirname: logDir,
  level: 'info'
})

const errorTransport = new winston.transports.File({
  filename: 'error.log',
  dirname: logDir,
  level: 'error'
})

const logger = winston.createLogger({
  transports: [infoTransport, errorTransport]
})

const stream = {
  write: (message) => {
    logger.info(message)
  }
}

export { logger, stream }
