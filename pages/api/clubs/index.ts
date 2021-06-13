import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../models/club";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import IUser, { User } from "../../../models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    if (req.query.memberID) {
      const user: IUser = await User.findOne({ uid: req.query.memberID.toString() });
      const clubs: IClub[] = await Club.find({
        members: {
          $in: [`${mongoose.Types.ObjectId(user._id)}`],
        },
      });
      return res.status(200).send(clubs);
    } else if (req.query.notMemberID) {
      const user: IUser = await User.findOne({ uid: req.query.notMemberID.toString() });
      const clubs: IClub[] = await Club.find({
        members: {
          $nin: [
            `${mongoose.Types.ObjectId(user._id)}`,
          ],
        },
      });
      return res.status(200).send(clubs);
    }
  } else if (req.method == "POST") {
    try {
      const advisor: IUser = await User.findById(req.body.advisorID);
      if (advisor.staff) {
        const newClub = new Club({
          name: req.body.name,
          description: req.body.description,
          room: req.body.room,
          advisor: mongoose.Types.ObjectId(req.body.advisorID),
          school: mongoose.Types.ObjectId(req.body.schoolID),
          imageURL: req.body.imageURL,
          approved: false,
          meetingTime: req.body.meetingTime,
          memberCount: 1,
          boardMembers: [mongoose.Types.ObjectId(req.body.studentCreator)],
          members: [mongoose.Types.ObjectId(req.body.studentCreator)],
        });
        const finalClub = await newClub.save();
        return res.status(201).send({ club: finalClub });
      } else {
        return res.status(502).send({
          status:
            "The advisor is not a staff member, please try again with a different advisor",
        });
      }
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
