import { auth, db } from "../../lib/firebase/config";
class Club {
  name: string;
  room: string;
  creator: string;
  creatorEmail: string;
  advisor: string;
  advisorEmail: string;
  description: string;
  imageURL: string;
  id: string;

  constructor(
    name: string,
    room: string,
    creator: string,
    creatorEmail: string,
    advisor: string,
    advisorEmail: string,
    imageURL: string,
    id: string
  ) {
    this.name = name;
    this.room = room;
    this.creator = creator;
    this.creatorEmail = creatorEmail;
    this.advisor = advisor;
    this.advisorEmail = advisorEmail;
    this.imageURL = imageURL; 
    this.id = id;
  }

  static fromDocSnapshot(doc: FirebaseFirestore.DocumentSnapshot): Club {
    const data = doc.data(); 
    return new Club(
      data.name,
      data.room,
      data.creator,
      data.creatorEmail,
      data.advisor,
      data.advisorEmail,
      data.imageURL,
      data.id
    );
  }
}

export default Club; 