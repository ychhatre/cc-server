import { db } from "../../../lib/firebase/config";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const user = await db.collection("users").doc(req.body.uid).set({
      name: req.body.name,
      grade: req.body.grade,
      clubs: [],
      email: req.body.email,
      username: req.body.username,
    });
    if (user) {
      return res.status(201).send({ status: "success", user: user });
    } else {
      return res.staus(502).send({ status: "failure" });
    }
  }
};

export default handler;
