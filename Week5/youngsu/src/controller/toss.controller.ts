import { ControllerDefaultClass } from "../../framework/types";
import express from 'express';
import TossService from "../service/toss.service";
import { confirmDto } from "../dto/confirm.dto";
import {randomString} from "../util/random";
import  EmailService  from "../service/email.service";
import HistoryService from "../service/history.service";
import SmsService from "../service/sms.service";
import UserService from "../service/user.service";

class TossController implements ControllerDefaultClass{
    private tossPage(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const orderId = randomString();
            const service = new TossService().default;
            const product = await service.getProduct();
            if(!req.session.user_id)
                res.json('Login First Please!');
            res.render('tossPage',{orderId:orderId,product:product});
        }
    }
    private tossSuccess(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const dto:any = req.query;
            const Tossservice = new TossService().default;
            const emailService = new EmailService().default;
            const historyService = new HistoryService().default;
            const data = await Tossservice.confirm(dto);

            if(data===null)
                res.json('Error!');
            else{
                const id = req.session.user_id;
                
                const result = await historyService.createHistory({...data,userId:id});
                emailService.sendEmail(req.session.user_id!,data);
                
                res.json('Payment Complete!');
            }
        }
    }
    private tossFail(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            console.log(req.query);
        }
    }
    private tossPayments(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
            const serivce = new TossService().default;
            const result = await serivce.payments(req.session.user_id!);

            console.log(result);

            res.json(JSON.stringify(result,null,4));
            
        }
    }
    private tossPayment(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const toss_serivce = new TossService().default;
            const sms_service = new SmsService().default;
            const user_service = new UserService().default;
            const phone_number = await user_service.selectPhoneNumberWithId(req.session.user_id!);
            const payment_key = req.params['paymentKey'];   
            const data = await toss_serivce.payment(payment_key,req.session.user_id!);
            if(typeof data !=='string'){
                const result = await sms_service.smsSend(phone_number!,data!);
                res.json('Complete!');
                
            }
        }
    }
    constructor(){};
    get default(){
        return{
        tossPage:this.tossPage,
        tossSuccess:this.tossSuccess,
        tossFail:this.tossFail,
        tossPayments : this.tossPayments,
        tossPayment : this.tossPayment,
        }
    }
}

export default TossController;