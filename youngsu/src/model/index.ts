
import { Sequelize } from "sequelize";
import path from 'path';
const config = require(path.join(process.cwd(),'config.json'))['development'];

const sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql'
});

sequelize.sync();
import User from "./User";
export {User}
export {sequelize};
