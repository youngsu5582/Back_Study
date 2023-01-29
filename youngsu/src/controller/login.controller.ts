import express from 'express';
import { ControllerDefaultClass } from '../../framework/types';
import { RouterApiSpec } from '../../framework/modules/router/types';
import { LoginService } from '../service/login.service';


class LoginController implements ControllerDefaultClass{
    constructor(){};
    private jwtLogin(api:RouterApiSpec){
        return async(req:express.Request,res : express.Response,next:express.NextFunction)=>{
        const service = new LoginService().default;
        const body = req.body;
        const result = await service.jwtLogin(body);
        if(result.status==='success'){
            const token = result.token;
            res.setHeader('authorization',token!);
            res.send('Login Complete!');    
        }
        else{
            res.send(result.message);
        }
    }
    }
    private jwtVerify(api:RouterApiSpec){
        return async(req:express.Request,res : express.Response,next:express.NextFunction)=>{
                const service = new LoginService().default;
                
                const token= req.headers['authorization'] as string ||undefined;
                console.log(token);
                
                const result = await service.jwtVerify(token);
                
                res.send(result);
        }
    }

    private sessionLogin(api:RouterApiSpec){
        return async(req:express.Request,res : express.Response,next:express.NextFunction)=>{
            const serivce = new LoginService().default;
            const body = req.body;{
            if(req.session.email===body['email']){
                res.send('Already Login!');
            }
            else{
            const result = await serivce.sessionLogin(body);
            if(result?.status ==='success'){
                req.session.email = result.body?.email;
                req.session.save();
                res.send(result.message);
            }
            else
                res.send(result?.message);
            }
        }
    }
    }
    
    private sessionVerify(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
            res.send(req.session.email);
        }
    }
    private socialLogin(api:RouterApiSpec){
        return async(req:express.Request,res : express.Response,next:express.NextFunction)=>{
                
        }
        
    }
    
    get default(){
        return{
            jwtLogin:this.jwtLogin,
            sessionLogin:this.sessionLogin,
            socialLogin:this.socialLogin,
            jwtVerify:this.jwtVerify,
            sessionVerify:this.sessionVerify,
        }
    }
}

export default LoginController;