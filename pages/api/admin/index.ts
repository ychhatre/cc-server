import { NextApiRequest, NextApiResponse } from "next";
import IClub, { Club } from "../../../models/club";
import dbConnect from "../../../utils/dbConnect";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";
import { credentials } from "../../../utils/credentials";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    if (req.query.clubStatus === "approved") {
      const clubs: IClub[] = await Club.find({
        approved: true,
        memberCount: { $gte: 10 },
      });
      for(var i = 0; i < clubs.length; i++){
        const s3LogoObjectUrl = parseUrl(`https://club-central.s3.us-east-2.amazonaws.com/${clubs[i]._id}.jpg`);

        const presigner = new S3RequestPresigner({
          credentials,
          region: "us-east-2",
          sha256: Hash.bind(null, "sha256")
          
        });
        clubs[i].imageURL = formatUrl(await presigner.presign(new HttpRequest(s3LogoObjectUrl)));  
      
      }
      return res.status(200).send([clubs, logoUrls]);
    } else if (req.query.clubStatus === "notApproved") {
      const clubs: IClub[] = await Club.find({
        approved: false,
      });
      var logoUrls = []
      for(var i = 0; i < clubs.length; i++){
        const s3LogoObjectUrl = parseUrl(`https://club-central.s3.us-east-2.amazonaws.com/${clubs[i]._id}.jpg`);

        const presigner = new S3RequestPresigner({
          credentials,
          region: "us-east-2",
          sha256: Hash.bind(null, "sha256")
        });

        const logoUrl = await presigner.presign(new HttpRequest(s3LogoObjectUrl));
        logoUrls.push(formatUrl(logoUrl));
      }
      return res.status(200).send([clubs, logoUrls]);
    } else if (req.query.clubStatus === "approvedPhase1") {
      const clubs: IClub[] = await Club.find({
        approved: true,
        memberCount: { $lt: 10 },
      });
      var logoUrls = []
      for(var i = 0; i < clubs.length; i++){
        const s3LogoObjectUrl = parseUrl(`https://club-central.s3.us-east-2.amazonaws.com/${clubs[i]._id}.jpg`);

        const presigner = new S3RequestPresigner({
          credentials,
          region: "us-east-2",
          sha256: Hash.bind(null, "sha256")
        });

        const logoUrl = await presigner.presign(new HttpRequest(s3LogoObjectUrl));
        logoUrls.push(formatUrl(logoUrl));
      }
      return res.status(200).send([clubs, logoUrls]);
    }
  } else if (req.method === "PATCH") {
    if (req.query.approvePhase1) {
      console.log(req.query.approvePhase1)
      await Club.updateOne(
        { _id: req.query.approvePhase1.toString() },
        {
          $set: {
            approved: true,
          },
        }
      );
      return res.status(200).send({"status": "success"});
    }
  }
};

export default dbConnect(handler);
