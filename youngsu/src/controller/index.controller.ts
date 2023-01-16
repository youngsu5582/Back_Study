import express, { NextFunction, application } from 'express';
import { ControllerDefaultClass } from '../../framework/types';
import { ResponseData, RouterApiSpec } from '../../framework/modules/router/types';

class IndexController implements ControllerDefaultClass{
    constructor(){};
    private index(api:RouterApiSpec){
        return async(req:express.Request,res : express.Response,next:express.NextFunction)=>{

            console.log("Post index!");
            return res.status(200).json('hi Postman');
        }

    }
    private indexPage(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction) =>{
            return res.render('indexPage');
        }
    }
    private authPage(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            if(req.session.email)
                res.json(req.session.email);
            else
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