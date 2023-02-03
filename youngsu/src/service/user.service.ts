import { FollowDto } from "../dto/follow.dto";
import FollowRepository from "../repository/follow.repository";

class UserService{
    constructor(){};
    private async followingList(followerId:number){
        const repository = new FollowRepository().default;
        return await repository.getFollowing(followerId);
    }
    private async followerList(followingId:number){
        const repository = new FollowRepository().default;
        return await repository.getFollower(followingId);
    }
    private async unfollow(dto:FollowDto){
        const repository = new FollowRepository().default;
        return await repository.unFollow(dto);
    }
    private async follow(dto:FollowDto){
        const repository = new FollowRepository().default;
        return await repository.Follow(dto);
    }

    get default(){
        return{
            followingList:this.followingList,
            followerList:this.followerList,
            unfollow:this.unfollow,
            follow:this.follow
        }
    }
}

export default UserService;