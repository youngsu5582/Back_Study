import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import * as session from 'express-session';
import Session from 'express-session';
import {createPool}from 'mysql2/promise';
import MongoStore from 'connect-mongo';
const config = require(path.join(process.cwd(),'config.json'))['development'];
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
        
        const pool = createPool({
            host:config.localhost,
            user:config.username,
            database:config.database,
            password:config.password
        });
        
        

        const store = MongoStore.create({mongoUrl:process.env.MONGOURL});
            
        
        app.use(Session({   
            secret:process.env.SECRET||'Random_Secret_Hash_x*nd23',
            resave:false,
            saveUninitialized:false,
            store: store
        }))
        app.use((req:express.Request,res:express.Response,next:express.NextFunction)=>{
            
            next();
        })
        app.set('view engine','ejs');
        app.set('views', path.join(process.cwd(), '/src/public/views'));
        console.log(path.join(process.cwd(),'/src/public/files'));
        app.use(express.static(path.join(process.cwd(),'/src/public/files')));
        //app.use(express.static(path.join(process.cwd(), '/src/public')));
        
        
        
        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({extended:false}));
        
        return app;
    }
}

export default new ExpressApp();