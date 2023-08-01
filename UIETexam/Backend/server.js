const express=require("express");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const adminRoutes=require("./routes/admin");
dotenv.config();

//to connect backend to database
const connectdb=require("./Database/DBconnection/conn");
connectdb();

app.use(express.json());
app.use(cors());


// admin routes
app.use("/api/r1", adminRoutes);

const port=process.env.PORT;

app.listen(port,(()=>{
    console.log(`server is running on port ${port}`);
}));

