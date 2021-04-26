import { NextApiRequest, NextApiResponse } from "next";
import ClubView from "../../../lib/classes/ClubView";
import { db } from "../../../lib/firebase/config";
import * as admin from "firebase-admin";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    if (req.query.all) {
      const approvedClubsDoc = await db
        .collection("admin")
        .doc("approved")
        .get();
      const clubsArray = approvedClubsDoc.data().approved;
      const finalClubs: ClubView[] = clubsArray.map((clubObject) =>
        ClubView.fromJson(clubObject)
      );
      return res.status(200).send(finalClubs);
    } else if (req.query.memberOf) {
      const memberUid: string = req.query.memberOf.toString();
      const user = await db.collection("users").doc(memberUid).get();
      const allClubs = (
        await db.collection("clubview").doc("clubs").get()
      ).data().clubs;
      const usersClubs: ClubView[] = [];
      for (let club of allClubs) {
        if (user.data().clubs.contains(club.id)) {
          usersClubs.push(club);
        }
      }
      return res.status(200).send(usersClubs);
    } else {
      const allClubs = (
        await db.collection("clubview").doc("clubs").get()
      ).data().clubs;
      const finalClubs: ClubView[] = allClubs.map((clubObject) =>
        ClubView.fromJson(clubObject)
      );
      return res.status(200).send(finalClubs); 
    }
  } else if (req.method == "POST") {
    try {
      const newClub = await db.collection("clubs").add({
        name: req.body.name,
        room: req.body.room,
        creator: req.body.creator,
        creatorEmail: req.body.creatorEmail,
        advisor: req.body.advisor,
        advisorEmail: req.body.advisorEmail,
        description: req.body.description,
        imageURL: req.body.imageURL,
        boardMembers: req.body.boardMembers,
        members: [],
      });
      await db
        .collection("admin")
        .doc("notApprovedPhase1")
        .update({
          notApprovedPhase1: admin.firestore.FieldValue.arrayUnion({
            ID: newClub.id,
            name: req.body.name,
            description: req.body.description,
            room: req.body.room,
            imageURL: req.body.imageURL,
          }),
        });
      await db
        .collection("clubs")
        .doc("clubsView")
        .update({
          clubsView: admin.firestore.FieldValue.arrayUnion({
            ID: newClub.id,
            name: req.body.name,
            description: req.body.description,
            room: req.body.room,
            imageURL: req.body.imageURL,
          }),
        });
      return res.status(201).send({ club: newClub });
    } catch (error) {
      return res.status(502).send({ error }); 
    }
  }
};

export default handler;
