import { Response, Request } from 'express'
import { IPost } from '../types/types'
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
    const allPosts: IPost[] = await Post.find({ creator: req.userId }).sort({ updatedAt: -1, createdAt: -1 })

    res.status(201).json({
      message: 'Post added',
      post: newPost,
      posts: allPosts
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
    const allPosts: IPost[] = await Post.find({ userId: req.userId }).sort({ updatedAt: -1, createdAt: -1 })
    res.status(200).json({
      message: 'Post updated',
      post: updatePost,
      posts: allPosts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPost: IPost | null = await Post.findByIdAndRemove(req.params.postId)

    const allPosts: IPost[] = await Post.find({ userId: req.userId }).sort({ updatedAt: -1, createdAt: -1 })
    res.status(200).json({
      message: 'Post deleted',
      post: deletedPost,
      posts: allPosts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error: ' + error
    })
  }
}

export { getUsersPosts, getUserPosts, addPost, updatePost, deletePost }
