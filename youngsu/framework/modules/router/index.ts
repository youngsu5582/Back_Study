import { RouterApiSpec , RequestData , ResponseData, RouterProps } from "./types";
import express from 'express';
type Info = {
    method:string;
    url:string;
    success:boolean;
}

class RouterModule{
    private schema : {[x:string]:RouterApiSpec} = {};
    private routeFunctions : {[x:string]:(api:RouterApiSpec) =>any}={};
    
    constructor({path,routeFunctions} : RouterProps){
        const apiSchemaJson = require(path);
        const apiSchema = Object.freeze(apiSchemaJson);
        this.schema = apiSchema;
        this.routeFunctions = routeFunctions;

    };
    
    init(app: express.Express) {
        const _schema = Object.entries(this.schema);
        const info: { method: string; url: string; success: boolean }[] = [];
    
        _schema.forEach(([key, api]) => {
          let isRegistered = false;
          
          if (typeof this.routeFunctions[key] === 'function') {
            app[api.method](api.url, this.routeFunctions[key](api));
            isRegistered = true;
          }
          
          console.log(api.url);
          info.push({
            method: api.method.toLocaleUpperCase(),
            url: api.url,
            success: isRegistered,
          });
        })
        
        console.log('* APIs *******');
        console.table(info);
      }
    }

export {RouterModule};