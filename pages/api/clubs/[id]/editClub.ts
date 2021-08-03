import { NextApiRequest, NextApiResponse } from "next";
import { Club } from "../../../../models/club";
import mongoose from "mongoose";
import { credentials } from "../../../../utils/imageParser";
const AWS = require('aws-sdk');

const s3 = new AWS.S3(credentials);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  if (req.method == "PATCH") {
      try {
        const finalClub = await Club.updateOne(
          { _id: id.toString() },
          {
            $set: {
              name: req.body.name,
              description: req.body.description,
              room: req.body.room,
              advisor: mongoose.Types.ObjectId(req.body.advisorID),
              meetingTime: req.body.meetingTime
            } as any,
          }
        );

        if(typeof req.body.logo != "undefined"){
          const params = {
            Bucket: "club-central",
            CreateBucketConfiguration: {
                LocationConstraint: "us-east-2"
            },
            Key: `${id.toString()}.jpg`,
            Body: req.body.logo
          };
  
          s3.upload(params, function(err, data) {
              if (err) {
                  throw err;
              }
              return res.status(201).send({ club: finalClub });
          });
        }
        else{
          return res.status(200).send(finalClub);
        }
      } catch (error) {
        return res.status(502).send({ error });
      }
    }
};

export default handler;
