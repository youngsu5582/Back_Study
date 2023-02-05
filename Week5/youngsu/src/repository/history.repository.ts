import { Types } from "mongoose";
import { historyDto } from "../dto/history.dto";
import { History } from "../model";


class HistoryRepository{
    constructor(){};
    private async createHistory(dto:historyDto){
        History.create({...dto});
    }
    private async getHistoryWithId(userId:Types.ObjectId){
        return await History.find({where:{
            userId : userId
        }},{paymentKey:1,_id:0});
    }
    private async checkHistoryWithId(payment_key:String,user_id:Types.ObjectId){
        return Boolean(await History.findOne({paymentKey:payment_key,userId:user_id}));
    }
    private async getHistoryWithPaymentKey(payment_key:String){
        return await History.findOne({
            paymentKey:payment_key
    })

    }
    get default(){
        return{
            createHistory: this.createHistory,
            getHistoryWithId : this.getHistoryWithId,
            getHistoryWithPaymentKey : this.getHistoryWithPaymentKey,
            checkHistoryWithId:this.checkHistoryWithId,
        }
    }

}

export default HistoryRepository;
