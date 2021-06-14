import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";
import { Club } from "../../../../models/club";
const User = require("../../../../models/user");
import dbConnect from "../../../../utils/dbConnect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (req.method == "GET") {
    const club = await Club.findById(id.toString()).populate("advisor");
    return res.status(200).send(club);
  }
};

export default dbConnect(handler);
