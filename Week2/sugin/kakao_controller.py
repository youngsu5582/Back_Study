from flask import request, session
from flask import jsonify, make_response, redirect, url_for
from oauth import Oauth
from util.kakao_db import database as db
from key.kakao_client import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SIGNOUT_REDIRECT_URI

def kakaoMain():
    if session:
        email = session['email']
        return email + "님 환영합니다 ♥"
    return "<a href = '/v1/oauth/kakao'>카카오 로그인</a>"

def kakaoLogin():
    kakao_oauth_url = f"https://kauth.kakao.com/oauth/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code"
    return redirect(kakao_oauth_url)

def callback():
    try:
        code = request.args["code"]
        print(code)

        #전달받은 authorization code를 통해서 access_token 발급
        oauth = Oauth()
        auth_info = oauth.auth(code)

        #error 발생 시 로그인 페이지로 redirect
        if "error" in auth_info:
            print("error !!")
            return {'message' : '인증 실패'}, 404
        
        #access_token을 사용하여 user의 정보 받아오기
        user = oauth.userinfo(f"Bearer " + auth_info['access_token'])
    except KeyError:
            return make_response({"message" : "INVALID_TOKEN"}, 400)
    
    print(user)
    kakao_account = user["kakao_account"]
    profile = kakao_account["profile"]
    name = profile["nickname"]
    if "email" in kakao_account.keys():
        email = kakao_account["email"]
    else:
        email = f"{name}@kakao.com"
    print(name)
    
    user = db().findByName(name)

    #user가 기존에 없는 사람이라면 db에 추가하고 session에 저장하여 로그인 상태로 만든다.
    if user is None:
        db().setUser(name, email)

    session['email'] = email

    return redirect(url_for('kakaoMain'))

def kakao_sign_out():
    # 카카오톡으로 로그아웃 버튼을 눌렀을 때
    kakao_oauth_url = f"https://kauth.kakao.com/oauth/logout?client_id={CLIENT_ID}&logout_redirect_uri={SIGNOUT_REDIRECT_URI}"

    if session.get('email'):
        session.clear()
        value = {"status": 200, "result": "success"}
    else:
        value = {"status": 404, "result": "fail"}
    print(value)
    return redirect(kakao_oauth_url)