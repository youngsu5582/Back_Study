import Framework from "../framework";
import { RouterModule } from "../framework/modules/router";
import path from 'path';
import { sync } from "./model";




import {AuthController,LoginController,TestingController,TossController} from './controller';
import LoggerModule from "../framework/modules/logger";

sync('mongo');
const framework = new Framework(
    {   
        serverProps:{},
        appProps:{
            modules:{
                logger: new LoggerModule(),
                router: new RouterModule({path:path.join(process.cwd(),'src/public/json/api.json'),routeFunctions:{
                    ...(new AuthController()).default,
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
