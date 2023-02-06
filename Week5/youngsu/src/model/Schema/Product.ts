import mongoose, {Schema, Types } from "mongoose";

interface ProductInterface{
    price : number;
    name : string;
    seller : string;
}

const productSchema = new Schema<ProductInterface>({
    price:{type:Number},
    name:{type:String},
    seller : {type:String},
    
})
export default mongoose.model('Product',productSchema);