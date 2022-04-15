import { Request, Response, NextFunction, Router } from 'express'

import { authJwt } from '../middlewares'
import { getPosts, addPost, updatePost, deletePost } from '../controllers/post.controller'

const router: Router = Router()

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.get('/', [authJwt.verifyToken], getPosts)

router.post('/', [authJwt.verifyToken], addPost)

router.put('/:postId', [authJwt.verifyToken], updatePost)

router.delete('/:postId', [authJwt.verifyToken], deletePost)

export default router
