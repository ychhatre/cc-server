import { db, auth } from "../../../lib/firebase/config";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const authUser = await auth.createUser({
        email: req.body.email,
        password: req.body.password,
      });
      const user = await db.collection("users").doc(authUser.uid).set({
        name: req.body.name,
        grade: req.body.grade,
        clubs: [],
        clubsBoard: [],
        email: req.body.email,
        username: req.body.username,
      });
      return res.status(201).send({ status: "success", user: user });
    } catch (error) {
      return res.staus(502).send({ error });
    }
  }
};

export default handler;
