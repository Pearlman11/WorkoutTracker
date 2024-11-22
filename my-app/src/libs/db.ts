import mongoose from "mongoose";


const connectMongoDB = async (): Promise<void> => {
 try {
   const uri = "mongodb+srv://sonicisreal:4762morganfreeman@cluster0.x7sxg.mongodb.net/"
   if (!uri) {
     throw new Error("MONGODB_URI is not defined in environment variables.");
   }


   await mongoose.connect(uri);
   console.log("Connected to MongoDB.");
 } catch (error) {
   console.log("Error connecting to MongoDB:", (error as Error).message);
 }
};


export default connectMongoDB;
