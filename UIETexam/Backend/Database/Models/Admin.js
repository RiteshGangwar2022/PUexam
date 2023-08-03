const mongoose=require("mongoose");
const Subject = require('./Subject');
const Professor=require("./Professor");
const jwt=require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of the Professor']
    },
    email:{
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
    mobile:{
        type:String,
        required: [true, 'Please provide Contact Number  of the Professor']
    },
    gender:{
        type: String,
        required: [true, 'Please provide name of the Professor'],
    },
    role:{
       type:String,
       required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:
    [
        {
          token:{
            type:String,
            required:true
          }
        }
    ]
});



// generting token
AdminSchema.methods.generatAuthtoken = async function(){
    try {
        let token = jwt.sign({ _id:this._id},process.env.SECRET_KEY,{
            expiresIn:"1d"
        });
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}


const Admin=new mongoose.model("Admin",AdminSchema);

module.exports=Admin;