import { IUser } from "../types/types"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 1
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<IUser>("user", userSchema)
