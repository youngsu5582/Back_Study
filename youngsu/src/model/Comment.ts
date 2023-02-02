import {Model,DataTypes, Association} from 'sequelize';
import {Post, User, sequelize} from './index';

class Comment extends Model{   
    public id !:number;
    public content!:string;
    public userId!:number;
    public postId!:number;
    public date!:Date;
    public static associations: {
            post:Association<Comment,Post>;
        };
}

Comment.init(
    {
        commentId: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        content:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        author:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        postId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Post,
                key:'postId'
            }
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:sequelize.literal('now()'),
        }
    },{
        sequelize,
        modelName:'comment'
    }
)

export default Comment;