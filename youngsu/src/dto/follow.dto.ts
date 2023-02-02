interface FollowDto{
    
    // 따르는 사람이 Follower
    
    // 특정인을 따르고있다 Following
    // 내가 강동원을 Following
    // 강동한한텐 내가 Follower
    followingId : number;
    followerId:number;
}
export type {FollowDto};