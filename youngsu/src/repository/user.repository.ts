import { User } from "../model";
import {UserDto} from '../dto/user.dto';

class UserRepository{
    constructor(){};
    private async findUser(email:string){
        return User.findOne({
            where:{
                email:email
            }
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
        findUser:this.findUser,
        checkUser:this.checkUser,
        createUser:this.createUser
    }
}
}
export {UserRepository};