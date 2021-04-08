import { db, auth } from "../../../lib/firebase/config";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const user = await db.collection("users").doc(req.body.uid).set({
        name: req.body.name,
        grade: req.body.grade,
        clubs: [],
        clubsBoard: [],
        email: req.body.email,
      });
      return res.status(201).send({ status: "success", user});
    } catch (error) {
      return res.staus(502).send({ error });
    }
  }
};

export default handler;
