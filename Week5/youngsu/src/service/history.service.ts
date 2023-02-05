import { historyDto } from "../dto/history.dto";
import HistoryRepository from "../repository/history.repository";

class HistoryService{
    constructor(){};
    private async createHistory(dto:historyDto){
        console.log(dto);
        const repository = new HistoryRepository().default;
        const history = repository.createHistory({...dto});
        
        return history;
    }
    get default(){
        return{
            createHistory : this.createHistory,
        }
    }
}

export default HistoryService;