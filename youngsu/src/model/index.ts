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
import Tag from './Tag';

//User 1 : N Post 
//Post 1 : N Comment


// Post.belongsTo(User,{
    //     foreignKey:'userId',
    //     foreignKeyConstraint:true
    // });
    
    
User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
// Comment.belongsTo(Post,{
//     foreignKey:'postId',
// });
// {
//    foreignKey:'postId'
// }
const Hashtag = sequelize.define('Post_Tag',{});
Tag.belongsToMany(Post,{foreignKey:'postId',as:'tagid',through:Hashtag});
Post.belongsToMany(Tag,{foreignKey:'tagId',as:'postid',through:Hashtag});

const Follow = sequelize.define('Follow',{});
User.belongsToMany(User,{
    foreignKey:'followingId',
    as:'followers',
    through:Follow
});
User.belongsToMany(User,{
    foreignKey:'followerId',
    as:'followings',
    through:Follow
});

sequelize.sync();

export {User,Post,Comment,Follow,Hashtag};
export {sequelize};
