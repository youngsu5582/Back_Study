
import winston, {Logger, createLogger,format,loggers,transports} from 'winston';
import { RouterApiSpec } from '../router/types';

type levelOption = 'info'|'debug'|'warn';

class LoggerModule{
    private static _logger : winston.Logger;

    constructor(){
        if(!LoggerModule._logger)
        LoggerModule._logger = this.init();
    };
    static get logger(){
        return LoggerModule._logger;
    }
    init(){
         return createLogger({
            level:'info',
            format:format.json(),
            transports:[
                new transports.File({filename:'error.log',level:'error'}),
                new transports.File({filename:'combined.log'})
            ]
        })  
    }

    // public static printLog(level : levelOption , message : string ){
    //     this._logger[level](message);
    // }
    public static printLog(message : string ){
        console.log(message);
        this._logger.info(message);
    }
}
export default LoggerModule;