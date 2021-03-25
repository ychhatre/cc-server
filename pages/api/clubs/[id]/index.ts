import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/firebase/config";

const handler = async(req:NextApiRequest, res: NextApiResponse) => {
    const { query: { id }} = req; 

    if(req.method == "GET") {
        const club = await db.collection('clubs').doc(id.toString()).get(); 
        if(club) {
            return res.status(200).send({club})
        } else {
            return res.status(502).send({"err":"club not found"})
        }
    }
}

export default handler; 