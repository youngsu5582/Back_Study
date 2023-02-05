
import axios from 'axios';
import { confirmDto } from '../dto/confirm.dto';
import { base64Encoding } from '../util/base64';
import productRepostiory from '../repository/product.repostiory';
import HistoryRepository from '../repository/history.repository';
import { Types } from 'mongoose';
import { historyDto } from '../dto/history.dto';
class TossService{
    constructor(){};
    private async confirm(dto : confirmDto){
        
        const seceret_key:String|undefined = process.env.TOSS_SECRET_KEY||undefined;
        const data = await axios.post('https://api.tosspayments.com/v1/payments/confirm',dto,{headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Basic ${await base64Encoding(seceret_key!+':')}`
        }}).then(
            (result)=>result.data
        )
        .catch(()=>null);
        if(data===null)return null;
            const result : historyDto={
                orderId : data.orderId,
                orderName    : data.orderName,
                paymentKey : data.paymentKey,
                
                totalAmount : data.totalAmount,
            }

            return result;
    }
    private async getProduct(id:number=-1){
        const repository = new productRepostiory().default;
        let product;
        if(id===-1) 
            product = await repository.selectRandomProduct();
        else
            product = await repository.selectProduct(id);
        return product;
    }
    private async Payment(user_id : Types.ObjectId , paymentKey : string){
        const repository = new HistoryRepository().default;
        const data = repository.getHistory(user_id);
        
    }
    get default(){
        return{
            confirm :this.confirm,
            getProduct : this.getProduct,
        }
    }
}



export default TossService;