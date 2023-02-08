import mongoose, {Schema,Types } from "mongoose";

interface UserInterface{
    name : string;

    
    
}

const userSchema = new Schema<UserInterface>({
    name:{type:String},
   
})
export default mongoose.model('User',userSchema); 