import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;
  if (req.method == "GET") {
    const user = await db.collection("users").doc(uid.toString()).get();
    if(user) {
        return res.status(200).send(user)
    } else {
        return res.status(502).send({"err": "user not found"})
    }
  }
};

export default handler;
