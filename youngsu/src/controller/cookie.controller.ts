import { ResponseData, RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";
import express from 'express';
import CookieService from "../service/cookie.service";


class CookieController implements ControllerDefaultClass{
    constructor(){};
    private cookieLogin(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new CookieService().default;
            const responseType:ResponseData = api.response;
            console.log(typeof(req.cookies));
            const user : string = req.cookies['user']||undefined;
            const result = await service.login(user);
            
            if(result?.status==='nouser'){
                
                res.cookie('user',req.body['user']);
                res.send('Cookie Set');
            }
            else
                res.send(`Hi ${user}`);
        }
    }
    private cookie(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            res.json(req.cookies);
        }
    }
    private cookieModify(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
            const key = req.body['key'];
            const value = req.body['value'];
            res.cookie(key,value);
            res.send('Modify Complete!');
        }
    }
    private cookieWithdrawl(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const key = req.body['key'];
            if(req.cookies[key]===undefined)
                res.send('Not Cookie!');
            else{
                res.clearCookie(key);
                res.send('Withdrawl!');
            }        }
    }

    get default(){
        return {
            cookieLogin:this.cookieLogin,
            cookie:this.cookie,
            cookieModify:this.cookieModify,
            cookieWithdrawl:this.cookieWithdrawl
        }
    }
}
export default CookieController;