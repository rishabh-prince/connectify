import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDb connected : ${conn.connection.host}`);
    }
    catch(error){
        console.log("mongoDb connection error ",error);
    }
}