import express from 'express';
import http from 'http';
class Server{
    private _server:http.Server|any = null;
    constructor({}){};
    get server(){
		return this._server;
	}
    init(app:express.Express){
        const server :http.Server = http.createServer(app);
        const port = process.env.PORT||'3000';
        
        
        
        server.listen(port);
        
        server.on('listening',()=>{
            const addr = server.address();
            if(addr){
                console.log("Listening on : " + port);
            }
        });

    }
    

}

export default Server;