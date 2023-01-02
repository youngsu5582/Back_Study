import Framework from "../framework";
import { RouterModule } from "../framework/modules/router";
import path from 'path';
import IndexController from "./controller/index.controller";
import { sequelize } from "./model";
import AuthController from "./controller/auth.controller";
import { CookieController } from "./controller/cookie.controller";

sequelize.authenticate().then(()=>{
    console.log("connect Complete!");
})
.catch(err=>{
    console.error("Error!");
})
const framework = new Framework(
    {
        serverProps:{},
        appProps:{
            modules:{
                router: new RouterModule({path:path.join(process.cwd(),'src/public/json/api.json'),routeFunctions:{
                        ...(new IndexController()).default,
                        ...(new AuthController()).default,
                        ...(new CookieController()).default,
                }})
            }
        }
    }
);
framework.run();
