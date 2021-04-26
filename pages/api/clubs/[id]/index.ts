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
    console.log(club); 
    return res.status(200).send(club); 
    // if (req.query.memberOf) {
    //   try {
    //     //get clubsView document and store into all clubs variable
    //     const clubsViewDoc = await db
    //       .collection("clubs")
    //       .doc("clubsView")
    //       .get();
    //     const allClubsData = clubsViewDoc.data().clubsView;
    //     const allClubs: ClubsView[] = allClubsData.map((club) =>
    //       ClubsView.fromJson(club)
    //     );

    //     //get the requested user & convert to User class
    //     const userDocSnapshot = await db
    //       .collection("users")
    //       .doc(req.query.memberOf.toString())
    //       .get();
    //     const user = User.fromDocumentSnapshot(userDocSnapshot);

    //     /*loop through clubs and if the name of the club 
    //   matches the clubsview add it to a 
    //   finalClubs array and return finalClubs */
    //     const finalClubs: ClubsView[] = [];
    //     for (let club of allClubs) {
    //       if (user.clubsMember.includes(club.id)) {
    //         finalClubs.push(club);
    //       }
    //     }
    //     return res.status(200).send(finalClubs);
    //   } catch (error) {
    //     return res.status(502).send({ error });
    //   }
    // } else if (req.query.notMemberOf) {
    //   try {
    //     //get clubsView document and store into all clubs variable
    //     const clubsViewDoc = await db
    //       .collection("clubs")
    //       .doc("clubsView")
    //       .get();
    //     const allClubsData = clubsViewDoc.data().clubsView;
    //     const allClubs: ClubsView[] = allClubsData.map((club) =>
    //       ClubsView.fromJson(club)
    //     );
    //     //get the requested user & convert to User class
    //     const userDocSnapshot = await db
    //       .collection("users")
    //       .doc(req.query.memberOf.toString())
    //       .get();
    //     const user = User.fromDocumentSnapshot(userDocSnapshot);

    //     /*remove all clubs where */

    //     const finalClubs: ClubsView[] = allClubs.filter((value, index, arr) => {
    //       return !user.clubsMember.includes(value.id);
    //     });
    //     return res.status(200).send(finalClubs);
    //   } catch (error) {
    //     return res.status(502).send({ error });
    //   }
    // } else {
    //   try {
    //     const club = await db.collection("clubs").doc(id.toString()).get();
    //     return res.status(200).send(club);
    //   } catch (error) {
    //     return res.status(502).send({ error });
    //   }
    // }
  } else if (req.method == "PATCH") {
    try {
      const newClub = await db.collection("clubs").doc(id.toString()).update({
        name: req.body.name,
        description: req.body.description,
        room: req.body.room,
        imageURL: req.body.imageURL,
        advisor: req.body.advisor,
        advisorEmail: req.body.advisorEmail,
      });
      return res.status(200).send(newClub);
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default dbConnect(handler);
