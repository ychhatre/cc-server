import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";
import { Club } from "../../../../models/club";
const User = require("../../../../models/user");
import dbConnect from "../../../../utils/dbConnect";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";
import { credentials } from '../../../../utils/credentials'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (req.method == "GET") {
    const club = await Club.findById(id.toString()).populate("advisor");

    const s3LogoObjectUrl = parseUrl(`https://club-central.s3.us-east-2.amazonaws.com/${club._id}.jpg`);

    const presigner = new S3RequestPresigner({
      credentials,
      region: "us-east-2",
      sha256: Hash.bind(null, "sha256")
    });

    const logoUrl = await presigner.presign(new HttpRequest(s3LogoObjectUrl));

    return res.status(200).send([club, formatUrl(logoUrl)]);
  }
};

export default dbConnect(handler);
