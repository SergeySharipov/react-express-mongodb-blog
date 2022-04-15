
import { Router } from 'express'
import postRoutes from './post.routes'
import authRoutes from './auth.routes'

const router: Router = Router()

router.use('/api/auth', authRoutes)
router.use('/api/post', postRoutes)

export default router
