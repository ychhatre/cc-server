import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../models/club";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import IUser, { User } from "../../../models/user";
import { parseImage } from "../../../utils/imageParser";
import { credentials } from "../../../utils/imageParser";
const AWS = require("aws-sdk");
const s3 = new AWS.S3(credentials);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
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
        if(!Array.from(clubs[i].boardMembers.values()).includes(user)) {
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
      const advisor: IUser = await User.findById(req.body.advisorID);
      const studentCreator: IUser = await User.findOne({
        uid: req.body.studentCreator,
      });

      if (advisor.staff) {
        const newClub = new Club({
          name: req.body.name,
          description: req.body.description,
          room: req.body.room,
          advisor: mongoose.Types.ObjectId(req.body.advisorID),
          school: mongoose.Types.ObjectId(req.body.schoolID),
          approved: false,
          meetingTime: req.body.meetingTime,
          memberCount: 1,
          boardMembers: {
            creator: mongoose.Types.ObjectId(studentCreator._id),
          },
          members: [mongoose.Types.ObjectId(studentCreator._id)],
          timestamp: Date.now() / 1000,
          tags: req.body.tags
        });

        console.log(req.body.logo.substring(0, 40));

        const finalClub = await newClub.save();

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
          return res.status(201).send({ club: finalClub });
        });
      } else {
        return res.status(502).send({
          status:
            "The advisor is not a staff member, please try again with a different advisor",
        });
      }
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
