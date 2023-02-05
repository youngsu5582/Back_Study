import mongoose, {Schema,Types } from "mongoose";

interface UserInterface{
    name : string;
    email : string;
    
    
}

const userSchema = new Schema<UserInterface>({
    name:{type:String},
    email:{type:String},
   
})
export default mongoose.model('User',userSchema); 