interface IComment {
  userId: string
  username: string
  content: string
}

interface ILike {
  userId: string
}

interface IPost {
  id: string
  userId: string
  content: string
  likes?: Array<ILike>
  comments?: Array<IComment>
  createdAt?: string
  updatedAt?: string
}

interface AddPostFormData {
  content: string
}

interface AddCommentFormData {
  content: string
}

interface PostProps {
  post: IPost
}

type ApiDataType = {
  message: string
  status: string
  userPosts: IPost[]
  usersPosts: IPost[]
  post?: IPost
}