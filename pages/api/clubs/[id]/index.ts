import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";
import { Club } from "../../../../models/club";
const User = require("../../../../models/user");
import dbConnect from "../../../../utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (req.method == "GET") {
    const club = await Club.findById(id.toString()).populate("advisor");
    return res.status(200).send(club);
  } else if (req.method == "PATCH") {
    try {
      const finalClub = await Club.updateOne(
        { _id: id.toString() },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            room: req.body.room,
            advisor: req.body.advisor,
            imageURL: req.body.imageURL,
            meetingTime: req.body.meetingTime
          },
        },
      );
      return res.status(200).send(finalClub); 
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
