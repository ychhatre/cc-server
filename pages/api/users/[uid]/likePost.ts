import { NextApiRequest, NextApiResponse } from "next";
import IPost, { Post } from "../../../../models/post";
import IUser, { User } from "../../../../models/user";
import dbConnect from "../../../../utils/dbConnect";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;

  if (req.method == "PATCH") {
    try {
      const currentUser: IUser = await User.findOne({ uid: uid.toString() });
      const currPost: IPost = await Post.findById(req.body.postID); 
      if (!currPost.likes.includes(currentUser._id)) {
        await Post.updateOne(
          { _id: req.body.postID },
          {
            $push: {
              likes: [mongoose.Types.ObjectId(currentUser._id)],
            },
          }
        );
        return res.status(201).send({ status: "success" });
      } else {
        return res
          .status(502)
          .send({ status: "The user has already liked the clu!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
