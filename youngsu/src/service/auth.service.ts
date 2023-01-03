import { UserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";



class AuthService{
    constructor(){};
    private async register(dto : UserDto){
        const repository = new UserRepository().default;
           
        if(await repository.checkUser(dto.email))
            return {status:'duplicated',user:'Already Registered'};
            
        const user = await repository.createUser(dto);
        
        if(user) return {status:'success',user:user};
        else return {status:'failure',user:'Not User'};
    }
     get default(){
        return {
            register:this.register,
        }
    }
}
export default AuthService;