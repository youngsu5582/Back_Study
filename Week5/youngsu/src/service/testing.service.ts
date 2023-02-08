import faker from 'faker';

import { UserRepository } from '../repository/user.repository';
import ProductRepository from '../repository/product.repostiory';
import { productDto } from '../dto/product.dto';

class TestingService{

    constructor(){};


    private async makeProduct(seed:number){
        faker.setLocale('en');
        faker.seed(seed);
        const repository = new ProductRepository().default;
        const testingData:productDto[]=[];
        for(let i =0;i<100;i++){
            const testProduct:productDto = {
                name : faker.commerce.productName(),
                seller : faker.name.findName(),
                price : faker.datatype.number({min:10000,max:100000}),

            }
            testingData.push(testProduct);
        }
        return testingData;
    }
    get default(){
        return{
            makeProduct : this.makeProduct,
        }
    }
}
export default TestingService;