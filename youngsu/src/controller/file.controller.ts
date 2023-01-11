import { RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";
import * as express from 'express';
import { FileService } from "../service/file.service";
class FileController implements ControllerDefaultClass{
    constructor(){};
    private readJson(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
                const service = new FileService().default;
                const body = req.body;
                const path:string = body.path;

                const result = await service.readJson(path);
                return res.json(result);
        }
    }
    private readCsv(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new FileService().default;
            const body = req.body;
            const path:string = body.path;
            
            
            
            const result = await service.readCsv(path);
            return res.json(result);   
        }
    }
    
    private readXml(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new FileService().default;
            const body = req.body;
            const path:string = body.path;
            
            const result = await service.readXml(path);
            return res.json(result);
        }
    }
    private readYaml(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new FileService().default;
            const body = req.body;
            const path:string = body.path;
            
            const result = await service.readYaml(path);
            
            return res.json(result);
        }
    }
    private readExif(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new FileService().default;
            const body = req.body;
            const path:string = body.path;
            
            const result = await service.readExif(path);
            
            return res.json(result);
        }
    }
    private writeData(api:RouterApiSpec){
        return async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
            const service = new FileService().default;
            const file = req.body.file;
            const result = await service.writeData(file);
            return res.json(result.status);
        }
    }
    get default(){
        return{
            readJson : this.readJson,
            readCsv : this.readCsv,
            readXml : this.readXml,
            readYaml : this.readYaml,
            readExif:this.readExif,
            writeData : this.writeData,
            
        }
    }
}

export default FileController;