import mongoose from 'mongoose';
import ISchool from "./school"
import IClub from "./club"
var Schema = mongoose.Schema;

export default interface IAnnouncement extends mongoose.Document {
    clubID: IClub
    announcementTitle: string
    announcementContent: string
    schoolID: ISchool
}

const announcement = new Schema({
  clubID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true
  },
  announcementTitle: {
    type: String,
    required: true
  },
  announcementContent: {
    type: String,
    required: true
  },
  schoolID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  },
});

export const Annnouncement = mongoose.models.Announcement || mongoose.model<IAnnouncement>("Announcement", announcement);

