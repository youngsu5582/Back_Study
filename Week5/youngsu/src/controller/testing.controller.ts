import { RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";
import express from 'express';
import TestingService from "../service/testing.service";

import ProductRepository from "../repository/product.repostiory";

class TestingController implements ControllerDefaultClass{

    private testingProduct(api:RouterApiSpec){

        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new TestingService().default;
            const repository = new ProductRepository().default;
            const seed = 1000;
            const result = await service.makeProduct(seed);
            for (let product of result)
                repository.createProduct(product);
            res.json(result);
        }
    }
    get default(){
        return {
            testingProduct:this.testingProduct,
        }
    }
}

export default TestingController;
