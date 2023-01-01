
class LoginService{
    private async jwtLogin(){
        
    }
    private async sessionLogin(){
        
    }
    private async socialLogin(){
        
    }
get default(){
    return {
        jwtLogin : this.jwtLogin,
        sessionLogin : this.sessionLogin,
        socialLogin : this.socialLogin
    }
}

}
export {LoginService};