import { ResponseData, RouterApiSpec } from "../../framework/modules/router/types";
import { ControllerDefaultClass } from "../../framework/types";
import { User } from "../model";
import AuthService from "../service/auth.service";
import express from 'express';


class AuthController implements ControllerDefaultClass{
    constructor(){};

    get default(){
        return{
            
        }
    }
}

export default AuthController;