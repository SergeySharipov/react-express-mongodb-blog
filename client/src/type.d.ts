interface IComment {
  userId: string
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

interface PostProps {
  post: IPost
}

type ApiDataType = {
  message: string
  status: string
  posts: IPost[]
  post?: IPost
}