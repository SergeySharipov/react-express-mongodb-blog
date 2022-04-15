import log from '../utils/log'

const requestLogger = (req: { method: unknown, path: unknown, body: unknown }, res: unknown, next: () => void) => {
  log.i('Method:', req.method)
  log.i('Path:  ', req.path)
  log.i('Body:  ', req.body)
  log.i('---')
  next()
}

export default requestLogger
