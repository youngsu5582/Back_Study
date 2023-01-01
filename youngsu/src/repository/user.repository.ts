import { User } from "../model";
import {UserDto} from '../dto/user.dto';

class UserRepository{
    constructor(){};
    private async checkUser(){
        return User.findAll
    }
    private async createUser(dto : UserDto){
        
        const user = await User.create({...dto});
        
        return user;
    }
    get default(){
        return{
        createUser:this.createUser
    }
}
}
export {UserRepository};