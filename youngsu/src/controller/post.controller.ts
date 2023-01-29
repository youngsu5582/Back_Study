import { RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";
import PostService from "../service/post.service";
import express from 'express';
import path from 'path';
type PostsType = 'recent'|'most';
type PostType = 'content'|'title'|'writer';

class PostController implements ControllerDefaultClass{
    constructor(){};
    private getPost(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service =  new PostService().default;
            const query = req.query;
            const type : PostType = query.type as PostType;
            const text :string = query.text as string;
            let result;
            if(type==='title')
                result = await service.getPostwithTitle(text);
            else if(type==='content')
                result = await service.getPostwithContent(text);
            else if(type==='writer')
                result = await service.getPostwithWriter(text);
            res.json(result);
        }
    }
    private getPosts(api:RouterApiSpec){
        return async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
            const service = new PostService().default;
            const query  = req.query;
            const type : PostsType = query.type as PostsType;
            const count : number = parseInt(query.number as string);
            
            let result;
            if(type==='most')
                result = await service.getMostPosts(count);
            else if(type==='recent')
                result = await service.getRecentPosts(count);
            res.json(result);
        }
    }
    private createPost(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
        }
    }

    get default(){
        return {
            getPost: this.getPost,
            getPosts : this.getPosts
        }   
    }
}
export default PostController;