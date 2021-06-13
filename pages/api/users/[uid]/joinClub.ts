import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../../models/club";
import IUser, { User } from "../../../../models/user";
import dbConnect from "../../../../utils/dbConnect";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;

  if (req.method == "PATCH") {
    try {
      const currentUser: IUser = await User.findOne({ uid: uid.toString() });
      const currClub: IClub = await Club.findOne({ _id: req.body.clubID });

      if (!currClub.members.includes(currentUser._id)) {
        const club = await Club.updateOne(
          { _id: req.body.clubID },
          {
            $push: {
              members: [mongoose.Types.ObjectId(currentUser._id)],
            },
            $inc: {
              memberCount: 1,
            } as any,
          }
        );
        return res.status(201).send({ status: "success" });
      } else {
        return res
          .status(502)
          .send({ status: "The user has already signed up for the club!" });
      }
    } catch (error) {
      console.log(error); 
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
