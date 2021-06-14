import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../../models/club";
import dbConnect from "../../../../utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  if (req.method == "PATCH") {
    try {
      await Club.updateOne(
        { _id: id.toString() },
        {
          $pull: { members: req.body.uid },
          $inc: {
            memberCount: -1,
          } as any,
        }
      );
      return res.status(200).send({"status": "success"});
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
