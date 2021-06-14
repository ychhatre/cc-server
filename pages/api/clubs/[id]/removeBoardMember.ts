import { NextApiRequest, NextApiResponse } from "next";
import { Club } from "../../../../models/club";
import mongoose from "mongoose";
import dbConnect from "../../../../utils/dbConnect";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  if (req.method == "PATCH") {
    try {
      const club = await Club.findById(id.toString());
      club.boardMembers.delete(req.body.role)
      const finalClub = await Club.updateOne(
        { _id: id.toString() },
        {
          $set: {
            boardMembers: club.boardMembers,
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
