import { productDto } from "../dto/product.dto";
import { Product } from "../model";
import { randomNumber } from "../util/random";
class ProductRepository{
    constructor(){};
    public async createProduct(dto:productDto){
        return await Product.create(dto);
    }
    public async selectRandomProduct(){
        return await Product.findOne().skip(randomNumber());
    }
    public async selectProduct(id:number){
        return await Product.findOne({id:id});
    }
    get default(){
        return{
            createProduct:this.createProduct,
            selectRandomProduct:this.selectRandomProduct,
            selectProduct:this.selectProduct,
        }
    }
}
export default ProductRepository;