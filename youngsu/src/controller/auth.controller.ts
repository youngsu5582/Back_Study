import { ResponseData, RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";
import { LoggerModule } from "../app";
import AuthService from "../service/auth.service";
import express, { NextFunction, Router } from 'express';

class AuthController implements ControllerDefaultClass{
    constructor(){};
    
    
    private register(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
            const responseType:ResponseData = api.response;
            const service = new AuthService().default;
            const body =req.body;
            const result = await service.register(body);
            
            const response = responseType[result.status];
            if(result.status==='success')return res.status(response.statusCode).json(result.json);
            else return res.status(response.statusCode).json(result.json);
        }

    }
    
    
    private authLogin(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const clientId = process.env.CLIENTID || undefined;
            const redirectUri = process.env.REDIRECTURI || undefined;
            
            // if(req.session.email)
            //     res.json('Already Login!');
            // else{
            const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname,profile_image,account_email`;
            res.redirect(url);
            //}
        }
    }
    
    private authCallback(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            LoggerModule.printLog(api.url);
            const service = new AuthService().default;
            const code = req.query.code;
            if(typeof code==='string'){
                const token = await service.getToken(code);
                
                const result = await service.getUser(token);
                req.session.email = result['data']['kakao_account']['email'];
                res.json("Social Login Complete!");
                
                //return res.json(result['data']['kakao_account']['email']);
            }
            
        }
    }   
    
     
    get default(){
        return{
            register:this.register,
            authLogin:this.authLogin,
            authCallback:this.authCallback,
        }
    }
    
}
export default AuthController;