import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
import "../../../../models/user";
import IClub, { Club } from "../../../../models/club";
import sgMail from "@sendgrid/mail";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method == "PATCH") {
    try {
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
      const club: IClub = await Club.findById(id.toString()).populate(
        "creator"
      );
      console.log(club.creator.email);
      await club.updateOne({ approved: true });

      await sgMail.send({
        to: club.creator.email,
        from: "dambrosiomichael@dublinusd.org",
        subject: `Congratulations, your club: ${club.name} has been approved!`,
        bcc: "ychhatre@gmail.com",
        text: "Congratulations, your club has been approved, you now have 7 days to accumulate ten members on the app, good luck!",
      });

      return res.status(201).send({ status: "success" });
    } catch (error) {
      console.log(error);
      return res.status(502).send({ error });
    }
  }
}

export default dbConnect(handler);
