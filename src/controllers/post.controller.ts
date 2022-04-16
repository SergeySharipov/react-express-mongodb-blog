import { Response, Request } from 'express'
import { IComment, ILike, IPost } from '../types/types'
import Post from '../models/post'

const getUsersPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: IPost[] = await Post.find({}).sort({ updatedAt: -1, createdAt: -1 })
    res.status(200).json({ posts })
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

const getUserPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: IPost[] = await Post.find({ userId: req.userId }).sort({ updatedAt: -1, createdAt: -1 })
    res.status(200).json({ posts })
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

const addPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Omit<IPost, 'id'>

    const post: IPost = new Post({
      content: body.content,
      likes: body.likes,
      comments: body.comments,
      userId: body.userId
    })

    const newPost: IPost = await post.save()

    const userPosts: IPost[] = await Post.find({ userId: req.userId }).sort({ createdAt: -1 })
    const usersPosts: IPost[] = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json({
      message: 'Post added',
      post: newPost,
      userPosts: userPosts,
      usersPosts: usersPosts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { postId },
      body
    } = req

    const post = body as IPost

    const updatePost: IPost | null = await Post.findByIdAndUpdate(
      {
        _id: postId
      },
      post
    )
    const userPosts: IPost[] = await Post.find({ userId: req.userId }).sort({ createdAt: -1 })
    const usersPosts: IPost[] = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json({
      message: 'Post updated',
      post: updatePost,
      userPosts: userPosts,
      usersPosts: usersPosts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { postId },
      body
    } = req

    const isLike = body.isLike
    const like: ILike = { userId: req.userId }
    const post = await Post.findById({
      _id: postId
    })
    if (post) {
      if (isLike) {
        if (post.likes.find(like => like.userId === req.userId)) {
          post.likes = post.likes ? [...post.likes, like] : [like]
        }
      } else {
        post.likes = post.likes?.filter(like => like.userId !== req.userId)
      }

      const updatePost: IPost | null = await Post.findByIdAndUpdate(
        {
          _id: postId
        },
        post
      )
      const userPosts: IPost[] = await Post.find({ userId: req.userId }).sort({ createdAt: -1 })
      const usersPosts: IPost[] = await Post.find({}).sort({ createdAt: -1 })
      res.status(200).json({
        message: 'Post liked',
        post: updatePost,
        userPosts: userPosts,
        usersPosts: usersPosts
      })
    } else {
      res.status(500).json({
        message: 'Error: Post not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

const commentPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { postId },
      body
    } = req

    const comment = body as IComment
    const post = await Post.findById({
      _id: postId
    })
    if (post) {
      post.comments = post.comments ? [...post.comments, comment] : [comment]

      const updatePost: IPost | null = await Post.findByIdAndUpdate(
        {
          _id: postId
        },
        post
      )
      const userPosts: IPost[] = await Post.find({ userId: req.userId }).sort({ createdAt: -1 })
      const usersPosts: IPost[] = await Post.find({}).sort({ createdAt: -1 })
      res.status(200).json({
        message: 'Post commented',
        post: updatePost,
        userPosts: userPosts,
        usersPosts: usersPosts
      })
    } else {
      res.status(500).json({
        message: 'Error: Post not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPost: IPost | null = await Post.findByIdAndRemove(req.params.postId)

    const userPosts: IPost[] = await Post.find({ userId: req.userId }).sort({ createdAt: -1 })
    const usersPosts: IPost[] = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json({
      message: 'Post deleted',
      post: deletedPost,
      userPosts: userPosts,
      usersPosts: usersPosts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

export { getUsersPosts, getUserPosts, addPost, updatePost, likePost, commentPost, deletePost }
