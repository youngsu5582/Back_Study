
import { UserRepository } from "../repository/user.repository";

class LoginService{

    private async sessionLogin(email:string){
        const repository = new UserRepository().default;
        const user = await repository.findUser(email);
        
        return user;
    }
    
    
    private async socialLogin(){
        
    }
get default(){
    return {
        sessionLogin : this.sessionLogin,
        socialLogin : this.socialLogin
    }
}

}
export {LoginService};