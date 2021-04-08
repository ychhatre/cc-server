import { NextApiRequest, NextApiResponse } from "next";
import ClubView from "../../../lib/classes/ClubView";
import { db } from "../../../lib/firebase/config";

const handler = async(req:NextApiRequest, res:NextApiResponse) => {
    if(req.query.clubStatus == "approved") {
        const approvedDoc = await db.collection("admin").doc("approved").get(); 
        const approvedClubs = approvedDoc.data().approved; 
        const finalClubs = approvedClubs.map(clubObject => ClubView.fromJson(clubObject)); 
        return res.status(200).send(finalClubs); 
    } else if(req.query.clubStats = "notApprovedPhase1") {
        const unApprovedDoc = await db.collection("admin").doc("notApproved").get();
        const unApprovedClubs = unApprovedDoc.data().notApprovedPhase1; 
        const finalClubs = unApprovedClubs.map(clubObject => ClubView.fromJson(clubObject)); 
        return res.status(200).send(finalClubs); 
    } else if(req.query.clubStats = "notApprovedPhase2") {
        const unApprovedDoc = await db.collection("admin").doc("notApproved").get();
        const unApprovedClubs = unApprovedDoc.data().notApprovedPhase2; 
        const finalClubs = unApprovedClubs.map(clubObject => ClubView.fromJson(clubObject)); 
        return res.status(200).send(finalClubs); 
    }
       
    
}

export default handler; 