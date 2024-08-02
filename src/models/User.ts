import mongoose from "mongoose";
import {randomUUID} from 'crypto'

export interface IUser extends Document {
  name: string,
  password: string,
  totalClicks: number,
  email: string
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email:{
    type: String,
    required: true,
    unique: true,
  },

  password:{
    type: String,
    required: true,
  },

  totalClicks:{
    type: Number,
    default: 5000
  }

})

export default mongoose.model<IUser>('User', userSchema)