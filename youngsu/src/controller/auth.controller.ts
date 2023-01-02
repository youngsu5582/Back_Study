import { ResponseData, RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";
import { User } from "../model";
import AuthService from "../service/auth.service";
import express from 'express';


class AuthController implements ControllerDefaultClass{
    constructor(){};
    private register(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
            const responseType:ResponseData = api.response;
            const service = new AuthService().default;
            const body =req.body;
            const result = await service.register(body);
            const response = responseType[result.status];
            response.json = result.user;
            
            //console.log(response.json);
            return res.status(response.statusCode).json(response.json);
        }

    }
    get default(){
        return{
            register:this.register,
        }
    }
}

export default AuthController;