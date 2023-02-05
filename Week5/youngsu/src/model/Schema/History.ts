import mongoose, {Schema,Types } from "mongoose";

interface HistoryInterface{
    orderId : string;
    orderName : string;
    paymentKey : string;
    totalAmount: number;
    userId : Types.ObjectId;
    
    
}

const historySchema = new Schema<HistoryInterface>({
    orderName:{type:String},
    orderId : {type:String},
    totalAmount:{type:Number},
    paymentKey:{type:String},
    userId:{type:Schema.Types.ObjectId,ref:'User'}
})
export default mongoose.model('History',historySchema);