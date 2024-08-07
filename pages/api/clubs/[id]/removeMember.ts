import { NextApiRequest, NextApiResponse } from "next";
import { Club } from "../../../../models/club";
import IUser, { User } from "../../../../models/user";
import dbConnect from "../../../../utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  if (req.method == "PATCH") {
    try {
      const currentUser:IUser = await User.findOne({uid: req.body.uid})
      await Club.updateOne(
        { _id: id.toString() },
        {
          $pull: { members: currentUser._id },
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
