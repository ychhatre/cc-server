import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../models/club";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import IUser, { User } from "../../../models/user";
import { parseImage } from "../../../utils/imageParser";
import { credentials } from "../../../utils/imageParser";
import AWS from "aws-sdk";
const s3 = new AWS.S3(credentials);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    if (req.query.test) {
      let boardMembers = {
        president: "chhatre7205@mydusd.org",
        vp: "bhatnagar2273@mydusd.org",
        treasurer: "kashyap2520@mydusd.org",
      };
      for (let [k, v] of Object.entries(boardMembers)) {
        const user: IUser = await User.findOne({
          email: v,
        });
        boardMembers[k] = user._id;
      }
      return res.status(200).send(boardMembers);
    }
    if (req.query.memberID) {
      const user: IUser = await User.findOne({
        uid: req.query.memberID.toString(),
      });
      const clubs: IClub[] = await Club.find({
        members: {
          $in: [`${mongoose.Types.ObjectId(user._id)}`],
        },
      });
      let finalClubs = [];
      for (var i = 0; i < clubs.length; i++) {
        if (!Array.from(clubs[i].boardMembers.values()).includes(user)) {
          finalClubs.push(await parseImage(clubs[i]));
        }
      }

      return res.status(200).send({ clubs: finalClubs });
    } else if (req.query.notMemberID) {
      const user: IUser = await User.findOne({
        uid: req.query.notMemberID.toString(),
      });
      const clubs: IClub[] = await Club.find({
        approved: true,
        members: {
          $nin: [`${mongoose.Types.ObjectId(user._id)}`],
        },
      });

      let finalClubs = [];
      for (var i = 0; i < clubs.length; i++) {
        finalClubs.push(await parseImage(clubs[i]));
      }

      return res.status(200).send({ clubs: finalClubs });
    }
  } else if (req.method == "POST") {
    try {
      const studentCreator: IUser = await User.findOne({
        uid: req.body.studentCreator,
      });
      for (let [k, v] of Object.entries(req.body.boardMembers)) {
        const user: IUser = await User.findOne({
          email: v,
        });
        if (!user) {
          return res.status(502).send({
            error: `The requested user with the email: ${v} does not exist, please try again with an email address that exists`,
          });
        }
        req.body.boardMembers[k] = user._id;
      }
      const newClub = new Club({
        name: req.body.name,
        description: req.body.description,
        room: req.body.room,
        advisor: req.body.advisor,
        school: mongoose.Types.ObjectId(req.body.schoolID),
        approved: false,
        meetingTime: req.body.meetingTime,
        memberCount: 1,
        boardMembers: req.body.boardMembers,
        members: [mongoose.Types.ObjectId(studentCreator._id)],
        timestamp: Date.now() / 1000,
        tags: req.body.tags,
      });

      const finalClub = await newClub.save();
      if (req.body.logo) {
        const buf = Buffer.from(
          req.body.logo.replace(/^data:image\/jpg;base64,/, ""),
          "base64"
        );
        const params = {
          Bucket: "club-central",
          CreateBucketConfiguration: {
            LocationConstraint: "us-east-2",
          },
          Key: `${finalClub._id}.jpg`,
          ContentEncoding: "base64",
          ContentType: "image/jpeg",
          Body: buf,
        };
        s3.upload(params, function (err, data) {
          if (err) {
            throw err;
          }
        });
      }

      return res.status(201).send({ club: finalClub });
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
