import { ControllerDefaultClass } from "../../framework/types";
import express from 'express';
import TossService from "../service/toss.service";
import { confirmDto } from "../dto/confirm.dto";
import {randomString} from "../util/random";

class TossController implements ControllerDefaultClass{
    private tossPage(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const orderId = randomString();
            const service = new TossService().default;
            const product = await service.getProduct();
            
            res.render('tossPage',{orderId:orderId,product:product});
        }
    }
    private tossSuccess(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
            const dto:any = req.query;
            const Tossservice = new TossService().default;
            
            const result = await Tossservice.confirm(dto);
            
            if(result===null)
                res.json('Error!');
            else
                res.json(result);

        }
    }
    private tossFail(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            console.log(req.query);
        }
    }
    private tossPayment(){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const paymentId = req.params['paymentId'];
            const serivce = new TossService().default;
            //const result = await service.

        }
    }
    constructor(){};
    get default(){
        return{
        tossPage:this.tossPage,
        tossSuccess:this.tossSuccess,
        tossFail:this.tossFail,
        }
    }
}

export default TossController;