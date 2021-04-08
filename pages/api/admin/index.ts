import { NextApiRequest, NextApiResponse } from "next";
import ClubView from "../../../lib/classes/ClubView";
import { db } from "../../../lib/firebase/config";
import * as admin from "firebase-admin";
import Club from "../../../lib/classes/Club";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    if (req.query.clubStatus == "approved") {
      const approvedDoc = await db.collection("admin").doc("approved").get();
      const approvedClubs = approvedDoc.data().approved;
      const finalClubs = approvedClubs.map((clubObject) =>
        ClubView.fromJson(clubObject)
      );
      return res.status(200).send(finalClubs);
    } else if ((req.query.clubStatus = "notApprovedPhase1")) {
      const unApprovedDoc = await db
        .collection("admin")
        .doc("notApproved")
        .get();
      const unApprovedClubs = unApprovedDoc.data().notApprovedPhase1;
      const finalClubs = unApprovedClubs.map((clubObject) =>
        ClubView.fromJson(clubObject)
      );
      return res.status(200).send(finalClubs);
    } else if ((req.query.clubStatus = "notApprovedPhase2")) {
      const unApprovedDoc = await db
        .collection("admin")
        .doc("notApproved")
        .get();
      const unApprovedClubs = unApprovedDoc.data().notApprovedPhase2;
      const finalClubs = unApprovedClubs.map((clubObject) =>
        ClubView.fromJson(clubObject)
      );
      return res.status(200).send(finalClubs);
    }
  } else if (req.method == "PATCH") {
    if (req.query.approvePhase1 as string) {
      try {
        const clubsNotApprovedPhase1: ClubView[] = (
          await db.collection("admin").doc("notApprovedPhase1").get()
        )
          .data()
          .notApprovedPhase1.map((clubObject) => ClubView.fromJson(clubObject));
        const newClubsNotApproviedPhase1: ClubView[] = clubsNotApprovedPhase1.filter(
          (value, index, arr) => {
            return value.id != req.query.approvePhase1;
          }
        );
        await db.collection("admin").doc("notApprovedPhase1").update({
          notApprovedPhase1: newClubsNotApproviedPhase1,
        });
        const approvedClubDoc = await db
          .collection("clubs")
          .doc(req.query.approvePhase1.toString())
          .get();
        const approvedClub: Club = Club.fromDocSnapshot(approvedClubDoc);
        await db
          .collection("admin")
          .doc("notApprovedPhase2")
          .update({
            notApprovedPhase2: admin.firestore.FieldValue.arrayUnion({
              ID: approvedClub.id,
              name: approvedClub.name,
              description: approvedClub.description,
              room: approvedClub.room,
              imageURL: approvedClub.imageURL,
            }),
          });
      } catch (error) {
        return res.status(200).send({ error });
      }
    }
  }
};

export default handler;
