import mongoose from "mongoose";

const schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user"
    },
    subscription:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        
    },
    
},
{
    timestamps: true
});

const user = mongoose.model("user", schema);
export default user;

