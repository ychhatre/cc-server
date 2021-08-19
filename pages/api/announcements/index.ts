import { NextApiRequest, NextApiResponse } from "next";
import { Announcement } from "../../../models/announcement";
import dbConnect from "../../../utils/dbConnect";
import { messaging } from "../../../lib/firebase/config";
import IClub, { Club } from "../../../models/club";
import IUser from "../../../models/user";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const {
      body: { clubID, title, content },
    } = req;
    try {
      const announcement = new Announcement({
        clubID,
        title,
        content,
        schoolID: req.body.schoolID,
        timestamp: Date.now() / 1000,
      });
      const club: IClub = await Club.findById(clubID);
      let devtokens: string[] = [];
      club.members.forEach((member) => {
        devtokens.push.apply(member.devtokens);
      });
      let payload = {
        notification: {
          title,
          body: content,
          sound: "default",
          image: "",
          click_action: "",
        },
      };

      const finalAnnouncement = await announcement.save();

      return res.status(201).send(finalAnnouncement);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "GET") {
    const announcements = await Announcement.find({});
    return res.status(200).send(announcements);
  }
}

export default dbConnect(handler);
