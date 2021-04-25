import { NextApiRequest, NextApiResponse } from "next";
import ClubView from "../../../lib/classes/ClubView";
import { db } from "../../../lib/firebase/config";
import * as admin from "firebase-admin";
import { Club } from "../../../models/club";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";

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
    }
  } else if (req.method == "POST") {
    try {
      const newClub = new Club({
        name: req.body.name,
        description: req.body.description,
        room: req.body.room,
        advisor: mongoose.Types.ObjectId(req.body.advisor),
        // school: mongoose.Types.ObjectId(req.body.school),
        imageURL: req.body.imageURL,
        approved: req.body.boardMembers,
        meetingTime: req.body.meetingTime,
      });
      await newClub.save();
      return res.status(201).send({ club: newClub });
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
