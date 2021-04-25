import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
    console.log("The connection is established");
  }
  console.log("Is this running")
  await mongoose.connect("mongodb+srv://host:test1234@cluster0.cuzre.mongodb.net/schools?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true } );
  return handler(req, res);
};

export default connectDB;