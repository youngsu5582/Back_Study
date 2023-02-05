import mongoose, {Schema } from "mongoose";

type historyDto = {
    orderId : string;
    orderName : string;
    paymentKey : string;
    totalAmount: number;
    
    
}
export type {historyDto};