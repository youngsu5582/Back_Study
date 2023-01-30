import yaml from 'yamljs';
import fs from 'fs';
import {join} from 'path';
import { parseCsv } from '../util/parsing';
import xml2js from 'xml2js';
import exifr from 'exifr';
type data = string|object;
class FileService{
    constructor(){}
    private async readJson(path : string){
        
        
        const file = fs.readFileSync(join(process.cwd(),path)+'.json',{encoding:'utf-8'});
        if(file)
            return {'status':'ok','body':file};
        else
            return {'status':'nok'}; 
    }
    private async readCsv(path:string){
        
        
        const file = fs.readFileSync(join(process.cwd(),path)+'.csv',{ encoding:"utf-8"});
        const result = await parseCsv(file);
        return {status:'ok',body:result};
    }
    private async readXml(path:string){
        const file = fs.readFileSync(join(process.cwd(),path)+'.xml',{ encoding:"utf-8"});
        const result = await xml2js.parseStringPromise(file);
        
        return {status:'ok',body:result};
    }
    private async readYaml(path:string){
        const file = fs.readFileSync(join(process.cwd(),path)+'.yaml',{ encoding:"utf-8"});
        const result = yaml.parse(file);
        
        return {status:'ok',body:result};
    }
    private async readExif(path:string){
        const file = fs.readFileSync(join(process.cwd(),path));
        
        const data = await exifr.parse(file);
        const result = {
            make : data['Make'],
            latitude : data['latitude'],
            longitude : data['longitude']
        };
        return {status:'ok',body:result};
    }
    private async writeData(file : data){
               
        if(typeof file==='string')
            fs.writeFileSync(join(process.cwd(),'temp.json'),file);
        else
            fs.writeFileSync(join(process.cwd(),'temp.json'),JSON.stringify(file));
        return {status:'write Complete!!'};
    }

    get default(){
        return {
            readJson : this.readJson,
            readCsv : this.readCsv,
            readXml : this.readXml,
            readYaml : this.readYaml,
            readExif : this.readExif,
            writeData : this.writeData,
        }
    }
}
export default FileService;