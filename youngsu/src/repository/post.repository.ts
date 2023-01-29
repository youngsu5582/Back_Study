import { PostDto } from "../dto/post.dto";
import { Post } from "../model";
import {Op} from 'sequelize';


class PostRepository{
    constructor(){};
    private async createPost(dto:PostDto){
        
        const post = await Post.create({...dto});
        return post;
    }
    

    private async findMostViewedPosts(count:number){
        const posts = await Post.findAll(
            {
                order:[['views','DESC']],
                limit:count
            });
        return posts;
    }
    private async findMostRecentPosts(count:number){

        const posts = await Post.findAll({
            order:[['date','DESC']],
            limit:count
        })
        return posts;
    }
    private async findWriter(id:number){
        const posts = await Post.findAll({
            where:{userId:id},raw:true
        });
        return posts;
    }
    private async findTitle(title:string){
        const posts = await Post.findAll({
            where:{
                title:{
                    [Op.like]:"%"+title+"%"
                }
            }
        })
        return posts;
    }
    private async findContent(content:string){
        const posts = await Post.findAll({
            where:{
                content:{
                    [Op.like]:"%"+content+"%"
                }
            }
        })
        return posts;
    }
    get default(){
        return{
            createPost:this.createPost,
            findMostRecentPosts:this.findMostRecentPosts,
            findMostViewedPosts:this.findMostViewedPosts,
            findWriter:this.findWriter,
            findTitle:this.findTitle,
            findContent:this.findContent,
        }
    }

}
export default PostRepository;