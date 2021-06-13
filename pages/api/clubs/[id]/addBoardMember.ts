import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";
import { Club } from "../../../../models/club";

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
            boardMembers: req.body.boardMembers,
          },
        }
      );
      return res.status(200).send(finalClub);
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default handler;
