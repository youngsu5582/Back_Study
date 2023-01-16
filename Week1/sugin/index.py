from flask import Flask, request, jsonify, make_response, render_template

app = Flask(__name__)
Port = 8080

@app.route("/")
def main():
    return 'hello flask!!'

@app.route("/v1/index", methods=['POST', 'GET'])
def index():
    if(request.method == 'GET'):
        return render_template('index.html')
    else:
        param = request.get_json()
        print("\nListening on : " + str(Port))
        print("Post index!\n")
        return jsonify(param)


@app.route("/v1/cookie", methods=['GET'])
def cookies():
    if(request.method == 'GET'):
        return jsonify(request.cookies)
       

@app.route("/v1/cookie/login", methods=['POST'])
def login():
    cookie = request.cookies.get('user')
    user = request.get_json()
    print(cookie)
    if request.method == 'POST':
        if(cookie):
            return 'Hi ' + cookie
        else:
            res = make_response("Cookie Set")
            res.set_cookie('user', user['user'])
            return res

@app.route("/v1/cookie/modify", methods=['POST', 'GET'])
def modify():
    if request.method == 'POST':
        param = request.get_json()
        key = param['key']
        value = param['value']
        res = make_response("Modify Complete!")
        res.set_cookie(key, value)
        return res
    else:
        return '수정 페이지'

@app.route("/v1/cookie/withdrawl", methods=['POST', 'GET'])
def delete():
    if request.method == 'POST':
        key = request.get_json()['key']
        res = make_response('Withdrawl!')
        res.delete_cookie(key)
        return res
    else:
        return '쿠키 삭제 페이지'


if __name__=="__main__":
  app.run(port = Port, debug=True)