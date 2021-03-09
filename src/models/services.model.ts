import { IService } from "../types/service"
import { model, Schema } from "mongoose"

const serviceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    aias: {
      type: String,
      required: true,
    },
  }
)

export default model<IService>("Service", serviceSchema)