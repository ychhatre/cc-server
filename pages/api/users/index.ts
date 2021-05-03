import dbConnect from "../../../utils/dbConnect";
import { User } from "../../../models/user";
import mongoose from "mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      // const id = new ObjectID(req.body.uid)
      // console.log('id:', id); 
    
      const user = new User({
        // _id: id,
        name: req.body.name,
        email: req.body.email,
        graduationYear: req.body.graduationYear,
        staff: req.body.staff,
        schoolID: mongoose.Types.ObjectId(req.body.schoolID),
      });
      await user.save();
      return res.status(201).send({ status: "success" });
    } catch (error) {
      console.error(error);
      return res.status(502).send({ error });
    }
    
};

export default dbConnect(handler);

