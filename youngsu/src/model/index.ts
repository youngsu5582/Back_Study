import { Sequelize } from "sequelize";
import path from 'path';
const config = require(path.join(process.cwd(),'config.json'))['development'];

const sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql'
});


import User from "./User";
import Post from './Post';
import Comment from './Comment';

//User 1 : N Post 
//Post 1 : N Comment


//User.hasMany(Post);
Post.belongsTo(User,{
    foreignKey:'userId',
    foreignKeyConstraint:true
});


//Post.hasMany(Comment);
Comment.belongsTo(Post,{
    foreignKey:'postId',
});
//{
//    foreignKey:'postId'
//}
sequelize.sync();

export {User,Post,Comment}
export {sequelize};
