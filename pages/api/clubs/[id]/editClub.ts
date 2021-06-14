import { NextApiRequest, NextApiResponse } from "next";
import { Club } from "../../../../models/club";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  if (req.method == "PATCH") {
      try {
        const finalClub = await Club.updateOne(
          { _id: id.toString() },
          {
            $set: {
              name: req.body.name,
              description: req.body.description,
              room: req.body.room,
              advisor: mongoose.Types.ObjectId(req.body.advisorID),
              imageURL: req.body.imageURL,
              meetingTime: req.body.meetingTime
            } as any,
          }
        );
        return res.status(200).send(finalClub);
      } catch (error) {
        return res.status(502).send({ error });
      }
    }
};

export default handler;
