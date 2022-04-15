import { Request, Response, NextFunction, Router } from 'express'
import { verifySignUp } from '../middlewares'
import controller from '../controllers/auth.controller'

const router: Router = Router()

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup)

router.post('/signin', controller.signin)

export default router
