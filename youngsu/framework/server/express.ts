import express from 'express';
import dotenv from 'dotenv';

import path from 'path';
dotenv.config();
class ExpressApp{
    private readonly _instance : express.Express;
    constructor(){
        this._instance = this.init();
    }
    get instance(){
        return this._instance;
    }
    init(){
        const app = express();

        app.set('view engine','ejs');
        app.set('views', path.join(process.cwd(), '/src/public/views'));


        app.use(express.json());
        app.use(express.urlencoded({extended:false}));
        
        return app;
    }
    



}

export default new ExpressApp();