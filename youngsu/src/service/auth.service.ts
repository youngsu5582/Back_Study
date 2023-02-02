import { UserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";
import axios from 'axios';
import qs from 'qs';


class AuthService{
    constructor(){};
    private async register(dto : UserDto){
        const repository = new UserRepository().default;
        if(await repository.checkUser(dto.email))
            return {status:'duplicated',json:'Already Registered'};
            
        const user = await repository.createUser(dto);
        
        if(user) return {status:'success',json:'Register Complete!'};
        else return {status:'failure',json:'Not User'};
    }
    
    private async getToken(code:string){
        const token = await axios({//token
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:qs.stringify({
                grant_type: 'authorization_code',
                client_id:process.env.CLIENTID,
                client_secret:process.env.SECRETID,
                redirectUri:process.env.REDIRECTURI,
                code:code,
            })
        })
        return token['data']['access_token'];
    }
    
    private async getUser(token:string){
        
        const user = await axios({
            method:'GET',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return user;
    }
    
     get default(){
        return {
            register:this.register,
            getUser:this.getUser,
            getToken : this.getToken,
        }
    }
}
export default AuthService;