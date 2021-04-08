import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  if (req.method == "PATCH") {
    try {
      const newClub = await db.collection("clubs").doc(id.toString()).update({
        boardMembers: req.body.boardMembers,
      });
      return res.status(200).send(newClub);
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default handler;
