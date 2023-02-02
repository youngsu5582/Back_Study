
import PostRepository from "../repository/post.repository";
import { UserRepository } from "../repository/user.repository";



class PostService{
    private async getPostwithTitle(title:string){
        const repository = new PostRepository().default;
        const data = await repository.findTitle(title);
        console.log(data.length);
        return data;
    }
    private async getPostwithContent(content:string){
        const repository = new PostRepository().default;
        const data = await repository.findContent(content);
        return data;
    }
    private async getPostwithWriter(writer:string){
        const repository = new PostRepository().default;
        const repo = new UserRepository().default;
        const user = await repo.findUser(writer);
        
        console.log(user?.userId);
        const data = await repository.findWriter(user?.userId!);
        return data;
    }
    private async getRecentPosts(count:number){
        const repository = new PostRepository().default;
        const data = await repository.findMostRecentPosts(count);
        return data;
    }
    private async getMostPosts(count:number){
        const repository = new PostRepository().default;
        const data = await repository.findMostViewedPosts(count);
        return data;
    }
    
    get default(){
        return {
            getPostwithTitle:this.getPostwithTitle,
            getPostwithContent:this.getPostwithContent,
            getPostwithWriter:this.getPostwithWriter,
            getRecentPosts:this.getRecentPosts,
            getMostPosts:this.getMostPosts
        }
    }
}
export default PostService;