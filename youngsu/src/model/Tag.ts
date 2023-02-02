import {Model,DataTypes} from 'sequelize';
import {sequelize} from './index';

class Tag extends Model{
    public tagId !:number;
    public tagName !:string;
}
Tag.init(
    {
    tagId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    tagName:{
        type:DataTypes.STRING,
        allowNull:false,
    }        
},
{sequelize})

export default Tag;
