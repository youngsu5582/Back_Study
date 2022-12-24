import express from 'express';

import Server from './server';
import expressApp from './server/express';

type Instance = {
    app:express.Express;
}
class Framework{
    private static _instance : Instance;
    private readonly _app : express.Express;
    private readonly _server : Server;

    constructor(){
        if(!Framework._instance){
            Framework._instance = this.init();
        }

        this._app = expressApp.instance;
        this._server = new Server({});
    }
    static get instance(){
        return Framework._instance;
    }
       
    init(){
       return {
           app : this._app
        };
    }    
    run(){
        this._server.init(this._app);
    }
}

export default Framework