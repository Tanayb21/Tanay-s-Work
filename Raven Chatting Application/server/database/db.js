import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const userName = process.env.db_username;
const password = process.env.db_password;

const URL = `mongodb://${userName}:${password}@ac-iln9b8l-shard-00-00.grtastl.mongodb.net:27017,ac-iln9b8l-shard-00-01.grtastl.mongodb.net:27017,ac-iln9b8l-shard-00-02.grtastl.mongodb.net:27017/?ssl=true&replicaSet=atlas-u5qwtm-shard-0&authSource=admin&retryWrites=true&w=majority`;

const Connection = async () =>{
try{
    await mongoose.connect(URL,{ useUnifiedTopology: true});
    console.log("Connected");
}
catch(error){
console.log("Error while connection",error.message)
}
}


export default Connection;