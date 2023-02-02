import { User } from "../model";
import {UserDto} from '../dto/user.dto';
import { Sequelize } from "sequelize";

class UserRepository{
    constructor(){};
    private async findUser(email:string){
        return User.findOne({
            where:{
                email:email
            },raw:true,
            attributes:['userId']
        })
    }
    private async randomUser(){
        return User.findOne({
            order:Sequelize.literal('rand()'),limit:1,raw:true
        })
    }
    private async checkUser(email:string){
        
        
        return Boolean(await User.findOne({where:{email:email}}));
    }
    private async createUser(dto : UserDto){
        
        const user = await User.create({...dto});
            
        return user;
    }
    
    get default(){
        return{
        randomUser:this.randomUser,
        findUser:this.findUser,
        checkUser:this.checkUser,
        createUser:this.createUser
    }
}
}
export {UserRepository};