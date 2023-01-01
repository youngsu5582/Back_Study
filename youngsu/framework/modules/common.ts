import express from 'express';


abstract class ModuleDefaultClass{
    public abstract init(app:express.Express,args?:any):void;
}
export{ModuleDefaultClass};