const mongoose=require("mongoose"); 
const jwt=require("jsonwebtoken");

const SecrecySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of the Professor']
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        required: [true, 'Please provide Contact Number  of the Professor']
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
SecrecySchema.methods.generatAuthtoken = async function(){
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


const Secrecy=new mongoose.model("Secrecy",SecrecySchema);

module.exports=Secrecy;