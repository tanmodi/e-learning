import mongoose from "mongoose";

export async function connectDB() {
  try{
    await mongoose.connect(process.env.DB);
    console.log("Database connected");
  }
  catch(err){
    console.log(err);
  }
}   