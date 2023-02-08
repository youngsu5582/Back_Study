import express from 'express';
import { ControllerDefaultClass } from '../../framework/types';
import { RouterApiSpec } from '../../framework/modules/router/types';
import { LoginService } from '../service/login.service';



class LoginController implements ControllerDefaultClass{
    constructor(){};
    private loginPage(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            res.render('loginPage');
        }
    }

    private sessionLogin(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new LoginService().default;
            const email = req.body.email;
            const result = await service.sessionLogin(email);
            
            req.session.user_id = result?._id;
            res.json('Login!');
        }
    }
    

    
    get default(){
        return{
            loginPage:this.loginPage,
            sessionLogin:this.sessionLogin,
            
            
            
        }
    }
}

export default LoginController;