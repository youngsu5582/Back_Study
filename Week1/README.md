# Back_Study


### 처음 Server 구동

#### 1. 기본적인 Server 구동

#### 2. 자신의 Server를 다른 사람이 접속 가능하게 Open ( Port는 상관 X )
#### ngrok를 이용
#### https://ngrok.com/

#### 3. v1/index를 입력할시 아래와 같이 index Page를 Render ( Html File 이용 )
![1](https://user-images.githubusercontent.com/98307410/209441095-e79dd765-ac37-4992-96fc-e0d6c0539880.PNG)

#### 4. v1/index에 POST 방식으로 보내서 Console 에 출력과 동시에 JSON으로 response 하자 ( html form 으로 post 전송 X ) ,
#### Postman 이용
#### https://www.postman.com/downloads/
![2](https://user-images.githubusercontent.com/98307410/209441368-9cd1b191-3b0b-4be9-89aa-a887149f3f42.PNG)
![3](https://user-images.githubusercontent.com/98307410/209441399-37ef3fea-ccf0-4520-b4a5-ed49f7d70139.PNG)

### 5. Cookie 
#### Cookie 이용
#### a. v1/cookie에 GET 방식 보낼시 현재 존재하는 Cookies들을 json 형식으로 Response.

#### b. v1/cookie/login에 POST 방식 보낼시 user 라는 key를 가진 cookie가 존재하면 "Hi" + ${user cookie value} 를 ,
####    존재하지 않을시 user cookie를 생성해 저장한다.

#### c. v1/cookie/modify에 POST 방식 보낼시 body에서 key 와 value를 받아서 cookie의 값을 수정한다. (해당 key 에 대한 cookie가 없을시 생성되게 구현)

#### d. v1/cookie/withdrawl에 POST 방식 보낼시 body에서 key를 받아서 cookie를 삭제한다.
####    단 , 존재하지 않을시 Not Cookie를 Response에 send 한다.
![4](https://user-images.githubusercontent.com/98307410/210223652-62c19e19-3669-492f-a293-f597c20b2187.PNG)

![5](https://user-images.githubusercontent.com/98307410/210223655-c0e01b49-bf66-4c59-be8b-df3100a1dc65.PNG)

![6](https://user-images.githubusercontent.com/98307410/210223658-79fa2fa3-7630-45c0-8efe-ef82976531b3.PNG)

![7](https://user-images.githubusercontent.com/98307410/210223661-8694aee7-16f2-4931-a4bc-3c5121ea4d50.PNG)

![8](https://user-images.githubusercontent.com/98307410/210223663-1b44933a-913b-4ad8-ad42-e7c05dac044d.PNG)
