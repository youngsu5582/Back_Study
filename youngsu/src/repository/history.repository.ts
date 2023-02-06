import { Types } from "mongoose";
import { historyDto } from "../dto/history.dto";
import { History } from "../model";


class HistoryRepository{
    constructor(){};
    private async createHistory(dto:historyDto){
        History.create({...dto});
    }
    private async getHistory(userId:Types.ObjectId){
        return await History.find({where:{
            userId : userId
        }})
    }

    get default(){
        return{
            createHistory: this.createHistory,
            getHistory : this.getHistory,
        }
    }

}

export default HistoryRepository;
