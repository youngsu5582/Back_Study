    import {Model,DataTypes, Association} from 'sequelize';
    import {User, sequelize,Comment} from './index';

    class Post extends Model{
        public postId !:number;
        public title !:string;
    public content!:string;
    public userId!:number;
    public date!:Date;
    public views!:number;
    public like_count!:number;
    public static associations: { 
        user:Association<Post,User>;
        comment:Association<Post,Comment>;
    };
}


Post.init(
    {
        postId: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:User,
                key:'userId'
                
            },
            onDelete:'cascade'
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false,
            
        },
        views:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
        like_count:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
    },{
        sequelize,
        modelName:'post'
    }
)
export default Post;