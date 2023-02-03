import { FollowDto } from "../dto/follow.dto";
import { Follow } from "../model";
class FollowRepository{
    
    constructor(){};
    private async Follow(dto : FollowDto){
        Follow.create({...dto});
    }
    private async getFollower(id:number){
        return await Follow.findAll({where:{
            followingId:id
        }})
    }
    private async getFollowing(id:number){
        return await Follow.findAll({
            where:{ 
                followerId:id
            }
        })
    }
    private async unFollow(dto:FollowDto){
        Follow.destroy({where:{...dto}});
    }
    
    
    get default(){
        return {
            Follow:this.Follow,
            getFollower:this.getFollower,
            getFollowing:this.getFollowing,
            unFollow:this.unFollow
        }
    }
}

export default FollowRepository;