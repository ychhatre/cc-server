import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../../models/club";
import sgMail from "@sendgrid/mail";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method == "DELETE") {
    try {
      sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
      const club: IClub = await Club.findById(id);
      await sgMail.send({
        to: club.creator.email,
        from: "dambrosiomichael@dublinusd.org",
        subject: `Your Club: ${club.name} has been rejected`,
        text: req.body.message,
      });
      await Club.deleteOne({_id: club._id })
      return res.status(201).send({"status": "success"})
    } catch (error) {
	console.log(error);
	return res.status(502).send({error})
    }
  }
}

export default handler;
