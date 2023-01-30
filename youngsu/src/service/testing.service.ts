import faker from 'faker';
import { UserDto } from '../dto/user.dto';
import { PostDto } from '../dto/post.dto';
import { UserRepository } from '../repository/user.repository';

class TestingService{

    constructor(){};
    private async makeUser(seed:number){
        faker.seed(seed);
        const testingData:UserDto[] = [];
        for( let i = 0;i<100;i++){
            const testUser:UserDto={
                email:faker.internet.email(),
                password:faker.internet.password(),
            }
            
            testingData.push(testUser);
        }
        return testingData;
    }
    private async makePost(seed:number){
        faker.setLocale('en');
        faker.seed(seed);
        const repository = new UserRepository().default;
        const testingData:PostDto[] = [];
        for(let i =0;i<100;i++){
            const user = await repository.randomUser();
            
            const testPost:PostDto={
                title:faker.lorem.sentence(),
                content : faker.lorem.text(),
                like_count:faker.datatype.number({min:1,max:1000}),
                views:faker.datatype.number({min:10,max:10000}),
                userId: user!.userId,
                date:faker.date.recent(),
                hashtag:[faker.random.arrayElement(["#javascript",'#node','#faker'])]
        }
        testingData.push(testPost);
    }
    return testingData;
}
    get default(){
        return{
            makeUser : this.makeUser,
            makePost : this.makePost,
        }
    }
}
export default TestingService;