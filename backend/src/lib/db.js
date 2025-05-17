import mongoose from "mongoose";



export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB CONNECTED : ${conn.connection.host}`);
    }catch(error){
        console.error("MongoDB CONNECTION FAILED : ",error);
    }
}