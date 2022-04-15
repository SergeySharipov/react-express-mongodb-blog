import { ITodo } from "../types/types"
import { model, Schema } from "mongoose"

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
)

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<ITodo>("todo", todoSchema)