import {User} from '../model/index';
import {UserDto} from '../dto/user.dto';
import { Types } from 'mongoose';


class UserRepository{
    constructor(){};
    private async findUser(email:string){
        return User.findOne({
            email:email
        })
    }
    private async findUserUsingId(id:Types.ObjectId){
        return User.findById(id);
    }
    private async createUser(dto : UserDto){
        
        const user = await User.create({...dto});
            
        return user;
    }

    
    get default(){
        return{
        
        findUser:this.findUser,
        findUserUsingId : this.findUserUsingId,
        createUser:this.createUser
    }
}
}
export {UserRepository};