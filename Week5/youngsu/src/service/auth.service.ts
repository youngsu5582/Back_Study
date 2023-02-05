import { UserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";
import axios from 'axios';



class AuthService{
    constructor(){};
    private async register(dto : UserDto){
        const repository = new UserRepository().default;
        
        const user = await repository.createUser(dto);
        
        return user;
    }
    

    
     get default(){
        return {
            register:this.register,
        }
    }
}
export default AuthService;