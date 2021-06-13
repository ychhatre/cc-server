import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { School } from "../../../models/school"; 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "POST") {
        try {
            const newSchool = new School({
                name: req.body.name,
                clubsManager: req.body.clubsManager,
                emailExtension: req.body.emailExtension,
                schoolContactEmail: req.body.schoolContactEmail,
            })
            await newSchool.save(); 
            return res.status(201).send({ status: "success" }); 
        } catch (error) {
            return res.status(502).send({ error });
        }
    }
}

export default dbConnect(handler); 