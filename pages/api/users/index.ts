import { db, auth } from "../../../lib/firebase/config";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      console.log("Is this logging"); 
      const user = await db.collection("users").doc(req.body.uid).set({
        name: req.body.name,
        clubs: [],
        clubsBoard: [],
        email: req.body.email,
      });
      console.log("Second print statement"); 
      return res.status(201).send({ status: "success"});
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default handler;
