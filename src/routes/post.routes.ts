import { Request, Response, NextFunction, Router } from 'express'

import { authJwt } from '../middlewares'
import { getUsersPosts, getUserPosts, addPost, updatePost, deletePost } from '../controllers/post.controller'

const router: Router = Router()

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

router.get('/all', [authJwt.verifyToken], getUsersPosts)

router.get('/', [authJwt.verifyToken], getUserPosts)

router.post('/', [authJwt.verifyToken], addPost)

router.put('/:postId', [authJwt.verifyToken], updatePost)

router.delete('/:postId', [authJwt.verifyToken], deletePost)

export default router
