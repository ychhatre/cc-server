import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;
  if (req.method == "GET") {
    try {
      const user = await db.collection("users").doc(uid.toString()).get();
      return res.status(200).send(user)
    } catch (error) {
      return res.status(502).send({error})
    }

  }
};

export default handler;
