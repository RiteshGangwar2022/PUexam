const express=require("express");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const adminRoutes=require("./routes/admin");
const examinerRoutes=require("./routes/examiner");
const assignyRoutes=require("./routes/assigny");
const SecrecyRoutes=require("./routes/secrecy");
dotenv.config();
//to connect backend to database
const connectdb=require("./Database/DBconnection/conn");
connectdb();

app.use(express.json());
app.use(cors());


// admin routes
app.use("/api/r1", adminRoutes);
app.use("/api/r2", examinerRoutes);
app.use("/api/r3", assignyRoutes);
app.use("/api/r4", SecrecyRoutes);

const port=process.env.PORT;

app.listen(port,(()=>{
    console.log(`server is running on port ${port}`);
}));

