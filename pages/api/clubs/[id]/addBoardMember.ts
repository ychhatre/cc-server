import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../../models/club";
import IUser, { User } from "../../../../models/user";
import mongoose from "mongoose";
import dbConnect from "../../../../utils/dbConnect";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  if (req.method == "PATCH") {
      try {
        const club:IClub = await Club.findById(id.toString());
        const currUser:IUser = await User.findOne({ uid: req.body.uid})
        club.boardMembers.set(req.body.role, currUser._id)
        const finalClub = await Club.updateOne(
          { _id: id.toString() },
          {
            $set: {
              boardMembers: club.boardMembers
            },
          }
        );
        return res.status(200).send(finalClub);
      } catch (error) {
        return res.status(502).send({ error });
      }
  }
};

export default dbConnect(handler);


