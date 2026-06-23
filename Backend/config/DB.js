import mongoose from "mongoose";

const connectDB = async () => {
  // Agar pehle se connected hai, to dobara connect mat karo (Serverless optimization)
  if (mongoose.connection.readyState === 1) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully.");
  } catch (error) {
    console.log(`Database Connection Error : ${error}`);
    throw error;
  }
};

export default connectDB;