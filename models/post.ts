import mongoose from 'mongoose';
import ISchool from "./school"
import IClub from "./club"
var Schema = mongoose.Schema;

export default interface IPost extends mongoose.Document {
    clubID: IClub
    title: string
    content: string
    likes: number
    schoolID: ISchool
}

const post = new Schema({
  clubID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  schoolID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },
});

export const Post = mongoose.models.Post || mongoose.model<IPost>("Post", post);

