import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";
import { User } from "../../../../models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;
  if (req.method == "GET") {
    try {
      const user = await User.findOne({uid: uid.toString()}); 
      return res.status(200).send(user); 
    } catch (error) {
      return res.status(502).send({error})
    }

  }
};

export default handler;
