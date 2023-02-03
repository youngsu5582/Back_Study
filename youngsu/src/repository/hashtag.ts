import { Hashtag } from "../model";
class HashtagRepository{
    constructor(){};
    private async addHashtag(dto:HashtagDto){
        Hashtag.create({...dto});
    }
    private async getPost(tagId:number){
        return await Hashtag.findAll({where:{
            tagId:tagId
        }})
    }

    get default(){
        return{

        }
    }

}

export default HashtagRepository;
