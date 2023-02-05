import { historyDto } from "../dto/history.dto";
import { makeSignature } from "../util/hmac";
import axios from 'axios';
class SmsService{
    constructor(){};
    private async smsSend(phone_number:string,data:historyDto){
        
        const {timestamp,signature} = await makeSignature();
        const url =`https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NCLOUD_SERVICE_KEY}/messages`;
        const line = `주문 번호 : ${data.orderId}\n주문 명 : ${data.orderName}\n주문 금액 : ${String(data.totalAmount)}`;
        
        const result = await axios({
            method:'POST',
            url:url,
            headers:{
                "Content-Type": "application/json; charset=utf-8",
                "x-ncp-apigw-timestamp": timestamp,
                "x-ncp-iam-access-key": process.env.NCLOUD_ACCESS_KEY,
                "x-ncp-apigw-signature-v2": signature,                
            },
            data:{
                "type":"SMS",
                "contentType":"COMM",
                "from":process.env.PHONE_NUMBER,
                "content":line,
                "messages": [
                    {
                      to: `${phone_number}`,
                    },
                  ],
            }
        })
        return result;
    }
get default(){
    return{
        smsSend:this.smsSend,
    }
}
}

export default SmsService;
