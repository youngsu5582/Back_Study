import {Model,DataTypes, Association} from 'sequelize';
import {Post, sequelize} from './index';
class User extends Model{
    static associate() {
        throw new Error('Method not implemented.');
    }
    public userId!:number;
    public email !:string;
    public password!:string;
 

}

User.init(
    {
        userId: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,    
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            
        },
    },{
        sequelize,
        modelName:'user'
    }
)





export default User;