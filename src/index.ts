import app from './app'
import http from 'http'
import config from './utils/config'
import log from './utils/log'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  log.i(`Server running on port ${config.PORT}`)
})