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
  } else if (req.method === "GET") {
    const announcements = await Announcement.find({});
    return res.status(200).send(announcements)
  }
}

export default dbConnect(handler);
