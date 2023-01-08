### Login 구현

#### 1. MySQL DB 연동
#### DB 연동 + Model 생성
##### User Model 생성 + email 과 password 는 string으로 선언
![2](https://user-images.githubusercontent.com/98307410/211160322-b86b4ca1-7a39-4ba4-a731-bcc760dd6f58.PNG)

#### 2. session 도 mysql 저장소에 연결
![2-a](https://user-images.githubusercontent.com/98307410/211186121-85319ab4-b88d-47e8-9499-9ba9fbc11745.PNG)

#### 3. v1/register에 POST 방식 보낼시 body에서 email 과 password를 받아서 User Model 을 만들어서 Insert 한다.
#### ( ORM 사용하든 원시 Query하든 상관 X )
![3](https://user-images.githubusercontent.com/98307410/211161195-d40b861b-3b50-465b-980e-cb48fb14ee82.PNG)
#### 3-1. Email 이 중복일 시 "Already Registerd!" 를 출력한다.

#### 4. v1/login/jwtLogin 에 POST 방식으로 보낼시 body에서 email 과 password를 받아서 Login 한다.
#### DB에서 검색한 후 , Record와 정보가 일치할 시 email을 사용해 jwt token 을 발급하고 , 
#### Response 의 Header authorization에 token을 저장하고 , "Login Complete!"를 출력한다.
![4](https://user-images.githubusercontent.com/98307410/211161474-6fa174dd-fca0-4b01-83be-85b5f813971d.PNG)

#### 5. v1/login/jwtVerify 에 POST 방식으로 보낼시 headers 에 authorization에 있는 token을 받아서 decode해서 email을 출력한다.
#### ( Postman Headers에 Authorization 에 jwtLogin을 통해 발급받은 token 값을 넣는다. )
#### - 기존 Cookie와 다르게 자동으로 저장이 안되는듯
![5](https://user-images.githubusercontent.com/98307410/211161922-ffaf12da-816e-4a99-95e6-1c4e04291c0c.PNG)

#### 6. v1/login/sessionLogin에 POST방식으로 보낼시 body에서 email 과 password를 받아서 Login 한다.
#### DB에서 검색한 후 , Record와 정보가 일치할 시 session에 email을 값을 저장하고 , "Login Complete!"를 출력한다.
![6](https://user-images.githubusercontent.com/98307410/211162124-e25543ed-1772-4cb3-a8b7-32975026a03d.PNG)

#### 7. v1/login/sessionVerify에 POST방식으로 보낼시 Request session에 저장되어 있는 email 값을 출력한다.
![7](https://user-images.githubusercontent.com/98307410/211162185-0ffbd8a9-ffe5-4955-b0ec-086f9d86722b.PNG)

#### ★★★★★★★ Social Login
#### 8. v1/auth 에 소셜 로그인을 위한 페이지를 만든다.
`a href 를 통해 social login Page에 연결한다.` ( kakao 든 , naver 든 , google 이든 상관 X , 자기가 연결하고 싶은 Social 에 연결 )
+ Kakao : 'https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=profile_nickname,profile_image,account_email'
+ Naver : 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state

https://developers.kakao.com/docs/latest/ko/kakaologin/common
#### - Internet 에 검색하면 잘 나오긴 하나 , 이번 기회에 Docs 를 읽고 이해하는 능력 기르면 좋겠음

1. developers 에 들어가서 로그인을 활성화 상태로 바꾸고 redirecrt Uri를 지정한다. ( http://localhost:5000/v1/auth/callback/ )
2. social login page 에 필요한 조건 (clientId , redirectUrl , scope ) 를 넣은채 링크를 만든다.
3. Social Login을 진행한 후 , auth/callback 으로 query 형식으로 code가 넘어간다.
4. code를 통해 oauth/token ( local 이 아닌 , social이 지정해준 site -EX) https://kauth.kakao.com/oauth/token ) 에 정해진 형식으로 POST를 보내서 access_token을 받는다.
5. tokne을 통해 사용자 정보를 요구 한다.
6. 받은 사용자 정보 중 email을 session에 저장 시킨다.
7. 그 후 , v1/auth를 다시 들어갈 시 , session에 email 정보가 있으면 email을 출력한다.
