import { Post } from "../../../models/post";
import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import IUser, { User } from "../../../models/user";
import { credentials } from "../../../utils/credentials";
const AWS = require('aws-sdk');

const s3 = new AWS.S3(credentials);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    const { clubID, title, content, schoolID, imageURL } = req.body;

    const studentCreator: IUser = await User.findOne({ uid: req.body.studentCreator });
    const post = new Post({
      clubID: mongoose.Types.ObjectId(clubID),
      title,
      content,
      likes: [],
      studentCreator: mongoose.Types.ObjectId(studentCreator._id),
      schoolID: mongoose.Types.ObjectId(schoolID),
      timestamp: Date.now()/1000
    });
    const finalPost = await post.save();

    const params = {
      Bucket: "club-central",
      CreateBucketConfiguration: {
          LocationConstraint: "us-east-2"
      },
      Key: `${finalPost._id}.jpg`,
      Body: req.body.logo
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        return res.status(201).send(finalPost);
    });
  }
}
export default dbConnect(handler);
