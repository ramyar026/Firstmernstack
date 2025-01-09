import mongoose from 'mongoose';


//creating the Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type:  String,
        unique:true,
        required: true,
    }
    
},
    {
        timestamp: true,

    }
)
const user = mongoose.model("user",userSchema);
export default user;