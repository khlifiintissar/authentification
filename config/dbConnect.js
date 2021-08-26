console.clear();
const mongoose=require("mongoose");
const connectDB=async()=>{
    try {
       await mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true 
       });
       console.log("Database is connected");
    } catch (error) {
        console.log("Data base is not connected!");
        console.log(error);
    }
}
module.exports=connectDB;