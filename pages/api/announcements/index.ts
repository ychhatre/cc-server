import { NextApiRequest, NextApiResponse } from "next";
import { Announcement } from "../../../models/announcement";
import dbConnect from "../../../utils/dbConnect";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const announcement = new Announcement({
      clubID: req.body.clubID,
      title: req.body.title,
      content: req.body.content,
      schoolID: req.body.schoolID,
      timestamp: Date.now() / 1000,
    });
    const finalAnnouncement = await announcement.save();
    return res.status(201).send(finalAnnouncement); 
  }
}

export default dbConnect(handler);
