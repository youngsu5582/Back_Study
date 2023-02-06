import Framework from "../framework";
import { RouterModule } from "../framework/modules/router";
import path from 'path';
import { sync } from "./model";




import {AuthController,CookieController,FileController,IndexController,LoginController, PostController, TossController} from './controller';
import LoggerModule from "../framework/modules/logger";
import TestingController from "./controller/testing.controller";
// import TestingController from "./controller/testing.controller";
// import PostController from "./controller/post.controller";


// sequelize.authenticate().then(()=>{
//     console.log("connect Complete!");
// })
// .catch(err=>{
//     console.error("Error!");
// })
sync('mongo');
const framework = new Framework(
    {   
        serverProps:{},
        appProps:{
            modules:{
                logger: new LoggerModule(),
                router: new RouterModule({path:path.join(process.cwd(),'src/public/json/api.json'),routeFunctions:{
                    ...(new IndexController()).default,
                    ...(new AuthController()).default,
                    ...(new CookieController()).default,
                    ...(new PostController()).default,
                    ...(new FileController()).default,
                    ...(new LoginController()).default,
                    ...(new TossController()).default,
                    ...(new TestingController()).default,
                    
                }}),
                
            }
        }
        
    }
);
framework.run();
export {LoggerModule};
