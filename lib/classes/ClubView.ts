import { auth, db } from "../../lib/firebase/config";

class ClubView {
  name: string;
  room: string;
  meetingTime: string;

  constructor(name: string, room: string, meetingTime: string) {
    this.name = name;
    this.room = room;
    this.meetingTime = meetingTime;
  }

  static fromJson(club: any): ClubView {
      return new ClubView(
        club.name,
        club.room,
        club.meetingTime
      ) 
  }

  static async getClubsList(): Promise<ClubView[]> {
    const clubDocument = await db.collection('admin').doc("approved").get(); 
    const clubsArray = clubDocument.data().approved; 
    const finalClubs:ClubView[] = clubsArray.map((club:any) => ClubView.fromJson(club))
    return finalClubs; 
  }
}

export default ClubView;
