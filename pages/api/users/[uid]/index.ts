import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../../lib/firebase/config";
import IUser, { User } from "../../../../models/user";
import dbConnect from "../../../../utils/dbConnect"; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;
  if (req.method == "GET") {
    try {
      const user:IUser = await User.findOne({uid: uid.toString()});
      return res.status(200).send(user); 
    } catch (error) {
      return res.status(502).send({error})
    }

  }
};

export default dbConnect(handler);
