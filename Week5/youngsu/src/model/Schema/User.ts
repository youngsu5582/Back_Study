import mongoose, {Schema,Types } from "mongoose";

interface UserInterface{
    name : string;
    email : string;
    phone_number : string;
    
    
}

const userSchema = new Schema<UserInterface>({
    name:{type:String},
    email:{type:String},
    phone_number:{type:String},
})
export default mongoose.model('User',userSchema); 