import mongoose, {Schema, Types } from "mongoose";

type historyDto = {
    orderId : string;
    orderName : string;
    paymentKey : string;
    totalAmount: number;
    userId?:Types.ObjectId;
    
    
}
export type {historyDto};