import { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { db } from "../../../../lib/firebase/config";
import { Club } from "../../../../models/club";
import IUser, { User } from "../../../../models/user";
import dbConnect from "../../../../utils/dbConnect";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;

  if (req.method == "PATCH") {  
    try {
      

      console.time("clubTime")
      const club = await Club.updateOne({_id: req.body.clubID}, { $push: {
        members: "60873fb4d1c1b926c5517689"
      }})
      console.timeEnd("clubTime")
      return res.status(201).send({ status: "success", club });
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
