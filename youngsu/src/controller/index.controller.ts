import express, { NextFunction, application } from 'express';
import {IndexService} from '../service/index.service';
import { ControllerDefaultClass } from '../../framework/types';
import { ResponseData, RouterApiSpec } from '../../framework/modules/router/types';

class IndexController implements ControllerDefaultClass{
    constructor(){};
    private index(api:RouterApiSpec){
        return async(req:express.Request,res : express.Response,next:express.NextFunction)=>{
            const service = new IndexService().default;

            const responseType : ResponseData = api.response;
            const body = req.body;
            
            
            const result = await service.index(body);
            
            const response =  responseType[result.status];
            response.json = result.body;
            
            return res.status(response.statusCode).json(response.json);
        }

    }
    private indexPage(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction) =>{
            const service = new IndexService().default;
            
            const result = await service.indexPage();
            
            if(result.status==='ok'){
                return res.render('indexPage');
            }
        }
    }
    private authPage(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
         
            res.render('loginPage');
        }
    }
    get default(){
        return {
            index : this.index,
            indexPage : this.indexPage,
            authPage:this.authPage,
        }
    }
}

export default IndexController;