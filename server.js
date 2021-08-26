const express=require("express");
const connectDB=require("./config/dbConnect");
const app =express();

const x=require("dotenv").config();
//connect to db
connectDB();
//routes
app.use(express.json());//middlware qui lit les forme json envoyées à travers les body req
app.use("/user",require("./routes/User"));

const PORT=process.env.PORT;

app.listen(PORT,(err)=>
err ? console.log(err) : console.log(`server is runnig on ${PORT}`));