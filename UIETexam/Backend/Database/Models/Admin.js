const mongoose=require("mongoose");
const Subject = require('./Subject');
const Professor=require("./Professor");

const AdminSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Please provide name of the Professor']
    },
    Email:{
        type:String,
        require:true
    },
    Subjects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    Professor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Professor'
    }],
    Age:{
        type: Number,
        required: [true, 'Please provide Age of the Professor']
    },
    ContactNumber:{
        type: Number,
        required: [true, 'Please provide Contac Number  of the Professor']
    },
    Gender:{
        type: String,
        required: [true, 'Please provide name of the Professor'],
        enum: ["Male", "Female"]
    },
    Department:{
        type:String,
        required:true
    },
    PFnumber:{
        type:String,
        required:true
    },
    Adhaarnumber:{
        type:String,
        required:true
    }
});

const Admin=new mongoose.model("Admin",AdminSchema);

module.exports=Admin;