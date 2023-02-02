import { RouterApiSpec } from "../../framework/modules/router/types";
import express from 'express';
import UserService from "../service/user.service";
class UserController{
    private follow(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new UserService().default;
            const followerId = req.session.uid!;
            const followingId = Number(req.body.followingId as string);
            const result = await service.follow({followerId:followerId,followingId:followingId});
            
            console.log(result);
            res.json(result);
        }
    }
    private followList(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new UserService().default;
            const id = req.session.uid!;
            const follwerList = await service.followerList(id);
            const followingList = await service.followingList(id);
        }
    }
    get default(){
        return{
            follow:this.follow,
            followList:this.followList,
        }
    }
}

export default UserController;