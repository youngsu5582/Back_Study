import { RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";
import express from 'express';
import TestingService from "../service/testing.service";
import PostRepository from "../repository/post.repository";
import { UserRepository } from "../repository/user.repository";
import ProductRepository from "../repository/product.repostiory";

class TestingController implements ControllerDefaultClass{
    private testingUser(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new TestingService().default;
            const repository = new UserRepository().default;
            const seed = req.body.seed;
            const result = await service.makeUser(seed);
            for(let user of result)
                repository.createUser(user);
            res.json(result);

        }
    }
    
    private testingPost(api:RouterApiSpec){

        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new TestingService().default;
            const repository = new PostRepository().default;
            const seed = req.body.seed;
            const result = await service.makePost(seed);
            for(let post of result)
                repository.createPost(post);
            res.json(result);
        }
    }
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
            testingUser:this.testingUser,
            testingPost:this.testingPost,
            testingProduct:this.testingProduct,
        }
    }
}

export default TestingController;
