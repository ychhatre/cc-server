import mongoose from "mongoose";
import ISchool from "./school";
import IClub from "./club";
import IUser from "./user";
var Schema = mongoose.Schema;

export default interface IPost extends mongoose.Document {
  clubID: IClub | string;
  title: string;
  content: string;
  likes: IUser[];
  imageURL: string;
  studentCreator: IUser | string;
  schoolID: ISchool | string;
  timestamp: Number;
}

const post = new Schema({
  clubID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    required: true,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  schoolID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  imageURL: {
    type: String,
  },
  studentCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    required: true,
    type: Number,
  },
});

export const Post = mongoose.models.Post || mongoose.model<IPost>("Post", post);
