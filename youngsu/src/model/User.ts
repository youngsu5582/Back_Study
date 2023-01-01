import {Sequelize,Model,DataTypes} from 'sequelize';
import {sequelize} from './index';
class User extends Model{
    public id!:number;
    public email !:string;
    public password!:string;
}


User.init(
    {
        id: {
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
            
        }
    },{
        sequelize,
        modelName:'user'
    }
)

export default User;