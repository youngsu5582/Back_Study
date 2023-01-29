import { UserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";
import { encode , decode } from '../util/jwt';
class LoginService{
    private async jwtLogin(dto : UserDto){
        const repository = new UserRepository().default;
        if(await repository.checkUser(dto.email)){
            const user = await repository.findUser(dto.email);
            if(user?.password===dto.password){
                return {status:'success',token:await encode(user.email)};
            }
            else
                return {status:'failure',message:'Not correct password!'};
        }
        else
            return {status:'nouser',message:'Register Please!'};   
    }
    private async jwtVerify(token:string|undefined){
        if(typeof token==='undefined')
            return null;
        else{
            const email = await decode(token);
            return email;
        }
    }
    private async sessionLogin(dto:UserDto){
        const repository = new UserRepository().default;
        if(await repository.checkUser(dto.email)){
            const user = await repository.findUser(dto.email);
            if(user?.password===dto.password){
                return {status:'success',message:'Login Complelte!',body:{'email':dto.email}};
                
            }
            else{
                return {status:'failure',message:'Login Fail!'};
            }
        }
    }
    
    
    private async socialLogin(){
        
    }
get default(){
    return {
        jwtLogin : this.    jwtLogin,
        jwtVerify: this.jwtVerify,
        sessionLogin : this.sessionLogin,
        socialLogin : this.socialLogin
    }
}

}
export {LoginService};