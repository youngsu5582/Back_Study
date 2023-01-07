### Login 구현

#### 1. MySQL DB 연동
#### DB 연동 + Model 생성
##### User Model 생성 + email 과 password 는 strignd으로 선언
![2](https://user-images.githubusercontent.com/98307410/211160322-b86b4ca1-7a39-4ba4-a731-bcc760dd6f58.PNG)



#### 3. v1/register에 POST 방식 보낼시 body에서 email 과 password를 받아서 User Model 을 만들어서 Insert 한다.
#### ( ORM 사용하든 원시 Query하든 상관 X )
![3](https://user-images.githubusercontent.com/98307410/211161195-d40b861b-3b50-465b-980e-cb48fb14ee82.PNG)
#### 3-1. Email 이 중복일 시 "Already Registerd!" 를 출력한다.

#### 4. v1/jwtLogin 에 POST 방식으로 보낼시 body에서 email 과 password를 받아서 Login 한다.
#### DB에서 검색한 후 , Record와 정보가 일치할 시 jwt token 을 발급하고 , 
#### Response 의 Header authorization에 token을 저장하고 , "Login Complete!"를 출력한다.
![4](https://user-images.githubusercontent.com/98307410/211161474-6fa174dd-fca0-4b01-83be-85b5f813971d.PNG)

#### 5. v1/jwtVerify에 POST방식으로 보낼 시 
