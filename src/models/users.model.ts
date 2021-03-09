import { IService } from "../types/service"
import { model, Schema } from "mongoose"
import { IUser } from "../types/user"

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
  }
)

export default model<IUser>("User", userSchema)