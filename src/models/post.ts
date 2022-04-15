import { IPost } from '../types/types'
import { model, Schema } from 'mongoose'

const postSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    likes: {
      type: Array
    },
    comments: {
      type: Array
    }
  },
  { timestamps: true }
)

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<IPost>('post', postSchema)
