import mongoose from "mongoose";
import ISchool from "./school";
import IClub from "./club";
var Schema = mongoose.Schema;

export default interface IAnnouncement extends mongoose.Document {
  clubID: IClub | string;
  title: string;
  content: string;
  schoolID: ISchool | string;
}

const announcement = new Schema({
  clubID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  schoolID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
});

export const Announcement =
  mongoose.models.Announcment ||
  mongoose.model<IAnnouncement>("Announcement", announcement);
