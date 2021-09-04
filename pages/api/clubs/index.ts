import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../models/club";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import IUser, { User } from "../../../models/user";
import { parseImage } from "../../../utils/imageParser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    if (req.query.memberID) {
      const user: IUser = await User.findOne({
        uid: req.query.memberID.toString(),
      });
      const clubs: IClub[] = await Club.find({
        approved: true,
        members: {
          $in: [`${mongoose.Types.ObjectId(user._id)}`],
        },
      }).populate({path: "boardMembers", model: "User", select: ['name', 'email']}); 
        
      let finalClubs = [];
      console.log(Object.entries(clubs[0].boardMembers))
      for (let club of clubs) {
        finalClubs.push(await parseImage(club));
      }

      return res.status(200).send({ clubs: finalClubs });
    } else if (req.query.notMemberID) {
      let finalClubs: IClub[] = [];
      const user: IUser = await User.findOne({
        uid: req.query.notMemberID.toString(),
      });

      const clubs: IClub[] = await Club.find({
        approved: true,
        members: {
          $nin: [`${mongoose.Types.ObjectId(user._id)}`],
        },
      }).populate({path: "boardMembers", model: "User", select: ['name', 'email']});

      for (let club of clubs) {
        if (!Object.values(club.boardMembers).includes(user.id)) {
          finalClubs.push(await parseImage(club));
        }
      }
      return res.status(200).send({ clubs: finalClubs });
    }
  } else if (req.method == "POST") {
    try {
      const studentCreator: IUser = await User.findOne({
        uid: req.body.studentCreator,
      });
      for (let [k, v] of Object.entries(req.body.boardMembers)) {
        const user: IUser = await User.findOne({
          email: v,
        });
        if (!user) {
          return res.status(502).send({
            error: `The requested user with the email: ${v} does not exist, please try again with an email address that exists`,
          });
        }
        req.body.boardMembers[k] = user._id;
      }
      
      let ids = Object.values(req.body.boardMembers).map(id => id.toString());
      let members = Array.from(new Set(ids));
      // console.log(members);

      const newClub = new Club({
        name: req.body.name,
        description: req.body.description,
        room: req.body.room,
        advisor: req.body.advisor,
        school: mongoose.Types.ObjectId(req.body.schoolID),
        approved: false,
        meetingTime: req.body.meetingTime,
        memberCount: members.length,
        boardMembers: req.body.boardMembers,
        members: members.map((member: string) =>
          mongoose.Types.ObjectId(member)
        ),
        timestamp: Date.now() / 1000,
        tags: req.body.tags,
        creator: mongoose.Types.ObjectId(studentCreator._id),
        meetingMinutesURL: req.body.meetingMinutesURL,
      });
      console.log("club:", newClub);
      const finalClub = await newClub.save();

      return res.status(201).send({ club: finalClub });
    } catch (error) {
      console.log(error);
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
