import mongoose from "mongoose";
import dotenv from'dotenv'
//Load info from env
dotenv.config()
// MAIN Function
export default async function DBconnection(){
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Data Base Is Connected");
    
} catch (error) {
    console.log("Than is Error while Connecting");
    console.error(error)
}

}