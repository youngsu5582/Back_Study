

class CookieService{
    constructor() {}
    private async login(user:string){
        if(typeof user ==='undefined')
            return {status:'nouser'};
        else
            return {status:'user'};
    }
    get default(){
        return {
            login:this.login
        }
    }
}
export {CookieService};