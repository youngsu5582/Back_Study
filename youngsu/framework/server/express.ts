import express from 'express';
import dotenv from 'dotenv';

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
        app.use(express.json());
        app.use(express.urlencoded({extended:false}));

        return app;
    }
    



}

export default new ExpressApp();