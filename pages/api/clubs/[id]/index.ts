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
import { parseImage } from "../../../../utils/imageParser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (req.method == "GET") {
    const club = await Club.findById(id.toString()).populate("advisor");

    const finalClub = await parseImage(club);

    return res.status(200).send({club:finalClub});
  }
};

export default dbConnect(handler);
