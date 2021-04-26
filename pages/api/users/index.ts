import { db, auth } from "../../../lib/firebase/config";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const user = await db.collection("users").doc(req.body.uid).set({
        name: req.body.name,
        clubs: [],
        clubsBoard: [],
        email: req.body.email,
      });
      return res.status(201).send({ status: "success"});
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default handler;
