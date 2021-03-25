import Club from "./club";

class User {
  name: string;
  grade: string;
  clubs: Club[];
  email: string;
  username: string;

  constructor(
    name: string,
    grade: string,
    clubs: Club[],
    email: string,
    username: string
  ) {
    this.name = name;
    this.grade = grade;
    this.clubs = clubs;
    this.email = email;
    this.username = username; 
  }

  static fromDocumentSnapshot(docSnapshot:FirebaseFirestore.DocumentSnapshot) {
      const data = docSnapshot.data(); 
      return new User(
          data.name,
          data.grade,
          data.clubs,
          data.email,
          data.username
      )
  }
}

export default User; 