import { Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
}

export interface IComment {
  userId: string
  username: string
  content: string
  date: number
}

export interface ILike {
  userId: string
}

export interface IPost extends Document {
  id: string
  userId: string
  content: string
  likes: Array<ILike>
  comments: Array<IComment>
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId: string
    }
  }
}
