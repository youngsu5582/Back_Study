import { Types } from "mongoose";
import { UserRepository } from "../repository/user.repository";

class UserService{
    constructor(){};
    private async selectPhoneNumberWithId(id:Types.ObjectId){
        const repository = new UserRepository().default;
        const data= await repository.selectPhoneNumberWithId(id).then((result)=>result!.phone_number) ;
        return data;
    }
    get default(){
        return{
            selectPhoneNumberWithId:this.selectPhoneNumberWithId,
        }
    }
}

export default UserService; 