import { NextApiRequest, NextApiResponse } from "next";
import ClubView from "../../../lib/classes/ClubView";
import { db } from "../../../lib/firebase/config";


const handler = async(req:NextApiRequest, res:NextApiResponse) => {
    if(req.method == "GET") {
        const approvedClubsDoc = await db.collection('admin').doc("approved").get(); 
        const clubsArray = approvedClubsDoc.data().approved; 
        const finalClubs: ClubView[] = clubsArray.map((clubObject) => ClubView.fromJson(clubObject))
        return res.status(200).send(finalClubs)
    } else if(req.method == "POST"){
        const newClub = await db.collection('clubs').add({
            name:req.body.name,
            room:req.body.room,
            creator:req.body.creator,
            creatorEmail: req.body.creatorEmail,
            advisor: req.body.advisor,
            advisorEmail: req.body.advisorEmail,
            description: req.body.description
        })

        return res.status(201).send({club: newClub})
    }
}

export default handler; 