import mongoose from "mongoose";
import IUser from "./user";

export default interface IClub extends mongoose.Document {
  name: string;
  description: string;
  room: string;
  imageURL: string;
  advisor: IUser;
  boardMembers: Map<string, IUser>;
  members: IUser[] | string[]; 
  schoolID: string;
  approved: boolean;
  meetingTime: string;
  memberCount: number
}

var club = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  advisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  boardMembers: {
    required: true,
    type: Map,
    of: mongoose.Types.ObjectId
  },
  members: {
    required: true,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ]
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
    required: true,
  },
  meetingTime: {
    type: String,
    required: true,
  },
  memberCount: {
    type: Number,
    required: true,
    default: 0
  },
  timestamp: {
    required: true,
    type: Number
  }
});
export const Club = mongoose.models.Club || mongoose.model<IClub>("Club", club);