import { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { db } from "../../../../lib/firebase/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;

  if (req.method == "PATCH") {
    try {
      await db
        .collection("users")
        .doc(uid.toString())
        .update({
          clubsMember: admin.firestore.FieldValue.arrayUnion(req.body.club),
        });
      await db
        .collection("clubs")
        .doc(req.body.clubID)
        .update({
          members: admin.firestore.FieldValue.arrayUnion({
            name: req.body.name,
            uid: req.body.uid,
          }),
        });
      return res.status(201).send({ status: "success" });
    } catch (error) {
      return res.status(502).send({ error });
    }
  }
};

export default handler;
