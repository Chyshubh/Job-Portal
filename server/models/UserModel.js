import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    resume: {type:String},
    image: {type:String, required:true}
})



const UserModel = mongoose.model('User',userSchema);

export default UserModel;