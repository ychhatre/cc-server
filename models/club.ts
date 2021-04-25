import mongoose from "mongoose";
import IUser from "./user";

export default interface IClub extends mongoose.Document {
  name: string;
  description: string;
  room: string;
  imageURL: string;
  advisor: IUser;
  boardMembers: IUser[];
  members: IUser[];
  schoolID: string;
  approved: boolean;
  meetingTime: string;
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
    required: false,
    default: [],
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  members: {
    required: false,
    default: [],
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ]
  },
  // school: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "schools",
  //   required: true,
  // },
  approved: {
    type: Boolean,
    default: false,
    required: true,
  },
  meetingTime: {
    type: String,
    required: true,
  },
});

export const Club = mongoose.model<IClub>("Club", club);
