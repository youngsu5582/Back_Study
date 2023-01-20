import os, sys
from flask import session
import jwt
from util.db import database

class User:
    def loginJWT(email, pwd):
        info = database().login(email, pwd) #payload
        print(type(info))
        if(info):
            token = jwt.encode(info, "secret", 'HS256')
            print(type(token))
            return token
        return False
    
    def loginSession(email, pwd):
        info = database().login(email, pwd) #payload
        if(info):
            session['data'] = email
            session.permanent = True
            return True
        return False
