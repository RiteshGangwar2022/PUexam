const mongoose=require("mongoose");

const AssignySchema = new mongoose.Schema({    
    name: {
        type: String,
        required: [true, 'Please provide name of the Professor']
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type: Number,
        required: [true, 'Please provide Contac Number  of the Professor']
    },
    gender:{
        type: String,
        required: [true, 'Please provide name of the Professor']
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
AssignySchema.methods.generatAuthtoken = async function(){
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


const Assigny=new mongoose.model("Assigny", AssignySchema);

module.exports=Assigny;