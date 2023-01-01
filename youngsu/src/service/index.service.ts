import express from 'express';
import { indexDto } from '../dto/index.dto';

class IndexService{
    constructor(){}
    private async index(body : indexDto){
        
        if(typeof body.id ==='undefined')return {status:'null',body:'null'};
        else return {status:'ok' , body:body.id};
    }
    private async indexPage(){
        return {status:'ok'};
    }

    get default(){
        return {
            index : this.index,
            indexPage : this.indexPage,
        }
    }
}
export {IndexService};