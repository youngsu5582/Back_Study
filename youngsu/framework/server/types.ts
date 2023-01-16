import { ModuleDefaultClass } from "../modules/common";

type ServerType = 'express'|'koa';

interface AppProps {
    modules: Modules;
    
    
  }
  
  interface ServerProps {
    
  }
  

type Modules = {
    logger: ModuleDefaultClass;
    router: ModuleDefaultClass;
  };

export type {ServerType ,Modules,ServerProps,AppProps};