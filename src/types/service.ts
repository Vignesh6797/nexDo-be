import { Document } from "mongoose"

interface IServiceItem {
    name: string
    description: string
    alias: string
}

export interface IService extends Document {
  name: string
  description: string
  alias: string
  items: Array<IServiceItem>
}