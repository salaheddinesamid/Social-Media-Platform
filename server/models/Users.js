import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min:3,
            max:30
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max:30
        },
        email:{
            type:String,
            required: true,
            min: 3,
            max: 30
        },
        password:{
            type:String,
            required: true,
            min:10,
            max:50
        },
        picturePath:{
            type: String,
            default: "",

        },
        friends:{
            type: Array,
            default:[]
        },location:String
    }
)
const User = mongoose.model("User",userSchema);
export default User;