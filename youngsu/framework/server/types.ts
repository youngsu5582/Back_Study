import { ModuleDefaultClass } from "../modules/common";

type ServerType = 'express'|'koa';

interface AppProps {
    modules: Modules;
  }
  
  interface ServerProps {
    
  }
  

type Modules = {
    router: ModuleDefaultClass;
  };

export type {ServerType ,Modules,ServerProps,AppProps};