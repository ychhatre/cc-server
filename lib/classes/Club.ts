import { auth, db } from "../../lib/firebase/config";
class Club {
  name: string;
  room: string;
  creator: string;
  creatorEmail: string;
  advisor: string;
  advisorEmail: string;
  description: string;
  id: string;

  constructor(
    name: string,
    room: string,
    creator: string,
    creatorEmail: string,
    advisor: string,
    advisorEmail: string,
    id: string
  ) {
    this.name = name;
    this.room = room;
    this.creator = creator;
    this.creatorEmail = creatorEmail;
    this.advisor = advisor;
    this.advisorEmail = advisorEmail;
    this.id = id;
  }

  static async fromDocSnapshot(clubID: string): Promise<Club> {
    const data = (await db.collection("clubs").doc(clubID).get()).data();
    return new Club(
      data.name,
      data.room,
      data.creator,
      data.creatorEmail,
      data.advisor,
      data.advisorEmail,
      data.id
    );
  }
}

export default Club; 