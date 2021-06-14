import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { School } from "../../../models/school";
import { Post } from "../../../models/post";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await Post.find({}, [], {
    sort: {
      timestamp: -1,
    },
  }).populate('clubID');
  return res.status(200).send(posts);
};

export default dbConnect(handler);
