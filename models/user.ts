import mongoose from 'mongoose';
import ISchool from "./school"
var Schema = mongoose.Schema;

export default interface IUser extends mongoose.Document {
    name: string
    email: string
    graduationYear: number
    staff: boolean
    schoolID: ISchool
    uid: string
    devtokens: string[]
}

const user = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  graduationYear: {
    type: Number,
    required: false
  },
  staff: {
    type: Boolean,
    default: false,
    required: true
  },
  schoolID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },
  uid: {
    required: true,
    type: String,
    unique: true
  },
  devtokens: {
    required: true,
    type: [String]
  }
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", user);

