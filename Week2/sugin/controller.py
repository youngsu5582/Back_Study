from flask import request, session
from flask import jsonify, render_template, make_response, redirect
import jwt, json
from user import User
from util.db import database

def main():
    return "hello week2 !!"

def register():
    if request.method == 'POST':
        param = request.get_json()
        email = param['email']
        pwd = param['password']

        if(database().overlapEmail(email)):
            return make_response('Already Registerd!')
        else:
            database().signup(email, pwd)
            return make_response('Register Complete!!')

def jwtLogin():
    if request.method == 'POST':
        param = request.get_json()
        email = param['email']
        pwd = param['password']
        token = User().loginJWT(email, pwd)
        if token:
            return {"Authorization" : token}, 200
        return jsonify(result=401)

def jwtVerify():
    if request.method == 'POST':
        token = request.headers.get('authorization')
        print(token)
        decode = jwt.decode(token, "secret", 'HS256')
        return decode['email']

def sessionLogin():
    if request.method == 'POST':
        param = request.get_json()
        email = param['email']
        pwd = param['password']
        ss = User().loginSession(email, pwd)
        if ss:
            print(request.cookies)
            return make_response('Login Complete!!')
        return jsonify(result=401)
    else:
        print(request.cookies)
        #print(request.headers['set-cookie'])
        database().saveSession(request.cookies['session'], session)
        return "session Login Page"

def sessionVerify():
    if request.method == 'POST':
        param = request.get_json()
        email = param['email']
        print(session)
        if email in session['data']:
            return email
        else: return jsonify(result=401)