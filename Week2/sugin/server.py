from flask import Flask, redirect, url_for, request
import controller as con
import kakao_controller as ka
from datetime import timedelta

app = Flask(__name__)
app.config["SECRET_KEY"] = "slrkanjfdkfdk"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=2)

@app.route("/", methods=["GET"])
def main(): return con.main()

@app.route("/v1/register", methods=["GET", "POST"])
def register(): return con.register()

@app.route("/v1/login/jwtLogin", methods=["GET", "POST"])
def jwtLogin(): return con.jwtLogin()

@app.route("/v1/login/jwtVerify", methods=["GET", "POST"])
def jwtVerify(): return con.jwtVerify()

@app.route("/v1/login/sessionLogin", methods=["GET", "POST"])
def sessionLogin(): return con.sessionLogin()

@app.route("/v1/login/sessionVerify", methods=["GET", "POST"])
def sessionVerify(): return con.sessionVerify()

@app.route("/v1/oauth")
def kakaoMain(): return ka.kakaoMain()

@app.route("/v1/oauth/kakao")
def kakaoLogin(): return ka.kakaoLogin()

@app.route("/v1/oauth/callback/", methods=["GET"])
def callback():
    return ka.callback()

@app.route("/v1/oauth/signout")
def kakao_signout(): return ka.kakao_sign_out()

if __name__ == "__main__":
    app.run(debug=True, port=5000)