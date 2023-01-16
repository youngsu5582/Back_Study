import express from 'express';
import { RouterApiSpec } from './modules/router/types';

abstract class ControllerDefaultClass {
    public abstract get default(): {
      
      [x: string]:
        
        (api: RouterApiSpec) => 
        (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>
    }
  }
 export {ControllerDefaultClass};