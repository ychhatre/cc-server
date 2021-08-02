import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { School } from "../../../models/school";
import { Post } from "../../../models/post";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";
import { credentials } from '../../../utils/credentials'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await Post.find({}, [], {
    sort: {
      timestamp: -1,
    },
  });

  var postUrls = []
  for(var i = 0; i < posts.length; i++){
    const s3PostObjectUrl = parseUrl(`https://club-central.s3.us-east-2.amazonaws.com/${posts[i]._id}.jpg`);

    const presigner = new S3RequestPresigner({
      credentials,
      region: "us-east-2",
      sha256: Hash.bind(null, "sha256")
    });

    const postUrl = await presigner.presign(new HttpRequest(s3PostObjectUrl));
    postUrls.push(formatUrl(postUrl));
  }
  return res.status(200).send([posts, postUrls]);
};

export default dbConnect(handler);
