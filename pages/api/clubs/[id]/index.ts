import { NextApiRequest, NextApiResponse } from "next";
import { Club } from "../../../../models/club";
import "../../../../models/user"
import dbConnect from "../../../../utils/dbConnect";
import { parseImage } from "../../../../utils/imageParser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (req.method == "GET") {
    const club = await Club.findById(id.toString()).populate("creator");
    console.log(club); 
    const finalClub = await parseImage(club);

    return res.status(200).send({club:finalClub});
  }
};

export default dbConnect(handler);
