import { Post } from "../../../models/post";
import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import IUser, { User } from "../../../models/user";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const { clubID, title, content, schoolID, imageURL } = req.body;

    const studentCreator: IUser = await User.findOne({ uid: req.body.studentCreator });
    const post = new Post({
      clubID: mongoose.Types.ObjectId(clubID),
      title,
      content,
      likes: [],
      imageURL: imageURL,
      studentCreator: mongoose.Types.ObjectId(studentCreator._id),
      schoolID: mongoose.Types.ObjectId(schoolID),
      timestamp: Date.now()/1000
    });
    const finalPost = await post.save();
    return res.status(201).send(finalPost)
  }
}
export default dbConnect(handler);
