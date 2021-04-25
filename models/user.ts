import mongoose from 'mongoose';
import ISchool from "./schools"
var Schema = mongoose.Schema;

export default interface IUser extends mongoose.Document {
    name: string
    email: string
    graduationYear: number
    staff: boolean
    schoolID: ISchool
}

var user = new Schema({
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
    required: true
  },
  staff: {
    type: Boolean,
    default: false,
    required: true
  },
//   schoolID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "schools",
//     required: true
//   }
});

export const User = mongoose.models.User || mongoose.model('User', user);

