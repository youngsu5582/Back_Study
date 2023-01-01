

type RequestData = {
    [x:string]:{
        type:string,
        description : string,
        required?:boolean,
    }
}
type ResponseData= {
    [x:string]:{
        statusCode:number;
        json:any;
    }
}
interface RouterProps{
    path: string;
    routeFunctions: { [x: string]: any };
  }
interface RouterApiSpec{
    method: 'get'|'post';
    url :string;
    response:ResponseData;
    body?:any;
    description:string;
    headers?:{
        Authorization:{
            type:string;
            required:boolean;
            description:string;
        }
    }
}

export type {RouterProps,RouterApiSpec,RequestData,ResponseData};