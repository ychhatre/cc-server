import Club from "./Club";

class User {
  name: string;
  grade: string;
  clubsMember: string[];
  clubsBoard: string[];
  email: string;
  username: string;

  constructor(
    name: string,
    grade: string,
    clubsMember: string[],
    clubsBoard: string[],
    email: string,
    username: string
  ) {
    this.name = name;
    this.grade = grade;
    this.clubsMember = clubsMember;
    this.clubsBoard = clubsBoard;
    this.email = email;
    this.username = username;
  }

  static fromDocumentSnapshot(docSnapshot: FirebaseFirestore.DocumentSnapshot) {
    const data = docSnapshot.data();
    return new User(
      data.name,
      data.grade,
      data.clubsMember,
      data.clubsBoard,
      data.email,
      data.username
    );
  }
}

export default User;
