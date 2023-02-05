import { ResponseData, RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";

import AuthService from "../service/auth.service";
import express from 'express';

class AuthController implements ControllerDefaultClass{
    constructor(){};
    

    private register(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new AuthService().default;
            
            const result = await service.register(req.body);
            
            res.json(result);
        }
    }

    
     
    get default(){
        return{
            register:this.register,
            
        }
    }
    
}
export default AuthController;