import log from '../utils/log'

const requestLogger = (request: { method: any; path: any; body: any }, response: any, next: () => void) => {
  log.i('Method:', request.method)
  log.i('Path:  ', request.path)
  log.i('Body:  ', request.body)
  log.i('---')
  next()
}

export default  requestLogger