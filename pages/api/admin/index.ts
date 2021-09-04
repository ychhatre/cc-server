import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../models/club";
import dbConnect from "../../../utils/dbConnect";
import { parseImage } from "../../../utils/imageParser";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    if (req.query.clubStatus === "approved") {
      const clubs: IClub[] = await Club.find({
        approved: true,
        memberCount: { $gte: 10 },
      }).populate({path: "boardMembers", model: "User", select: ['name', 'email', 'uid']});
      let finalClubs = []; 
      
      for(var i = 0; i < clubs.length; i++){
        finalClubs.push(await parseImage(clubs[i]))
      }
      return res.status(200).send({clubs: finalClubs});
    } else if (req.query.clubStatus === "notApproved") {
      const clubs: IClub[] = await Club.find({
        approved: false,
      }).populate({path: "boardMembers", model: "User", select: ['name', 'email', 'uid']});
      let finalClubs = []
      for(var i = 0; i < clubs.length; i++){
        finalClubs.push(await parseImage(clubs[i]))
      }
      return res.status(200).send({clubs: finalClubs});
    } else if (req.query.clubStatus === "approvedPhase1") {
      const clubs: IClub[] = await Club.find({
        approved: true,
        memberCount: { $lt: 10 },
      }).populate({path: "boardMembers", model: "User", select: ['name', 'email', 'uid']});
      let finalClubs = []
      for(var i = 0; i < clubs.length; i++){
        finalClubs.push(await parseImage(clubs[i]))
      }
      return res.status(200).send({clubs: finalClubs});
    }
  } else if (req.method === "PATCH") {
    if (req.query.approvePhase1) {
      console.log(req.query.approvePhase1)
      await Club.updateOne(
        { _id: req.query.approvePhase1.toString() },
        {
          $set: {
            approved: true,
          },
        }
      );
      return res.status(200).send({"status": "success"});
    }
  }
};

export default dbConnect(handler);
