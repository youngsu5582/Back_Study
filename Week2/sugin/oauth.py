import requests
from key.kakao_client import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI

class Oauth:
    def __init__(self):
        self.auth_server = "https://kauth.kakao.com%s"
        self.api_server = "https://kapi.kakao.com%s"
        self.default_header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
        }
    def auth(self, code):
        print("------ auth 실행중 ------")
        return requests.post(
            url="https://kauth.kakao.com/oauth/token",
            headers=self.default_header,
            data={
                "grant_type": "authorization_code",
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uri": REDIRECT_URI,
                "code": code,
            },
        ).json()
    
    def userinfo(self, bearer_token):
        print("------ userinfo 실행중 ------")
        return requests.post(
            url="https://kapi.kakao.com/v2/user/me",
            headers={
                **self.default_header,
                **{"Authorization": bearer_token}
            },
            # "property_keys":'["kakao_account.profile_image_url"]'
            data={}
        ).json()