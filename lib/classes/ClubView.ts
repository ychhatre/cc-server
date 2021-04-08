import { auth, db } from "../../lib/firebase/config";

class ClubView {
  id: string;
  name: string;
  description: string;
  room: string;
  meetingTime: string;

  constructor(
    name: string,
    room: string,
    meetingTime: string,
    id: string,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.room = room;
    this.meetingTime = meetingTime;
  }

  static fromJson(club: any): ClubView {
    return new ClubView(
      club.id,
      club.name,
      club.description,
      club.room,
      club.meetingTime
    );
  }

  // static async getClubsList(): Promise<ClubView[]> {
  //   const clubDocument = await db.collection("admin").doc("approved").get();
  //   const clubsArray = clubDocument.data().approved;
  //   const finalClubs: ClubView[] = clubsArray.map((club: any) =>
  //     ClubView.fromJson(club)
  //   );
  //   return finalClubs;
  // }
}

export default ClubView;
