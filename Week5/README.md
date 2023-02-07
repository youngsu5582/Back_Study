# Back_Study
## Mongo Processing Ability + API 


### User Model
#### Attribute
name(String) , email(String) , phone_number(String)

### History Model
#### Attribute
status(String) , provatedAt(Date) , orderId(String) , orderName(String) , paymentKey(String) , totalAmount(Number) , userId(ObjectId , reference : User)
### Product Model
#### Attribute
price(String) , name(String) , seller(String)


### 0. 회원가입 및 로그인은 이미 해봤으니 사진 생략
### 단 , POSTMAN이 아닌 html로 로그인 해야함. ( sdk 사용하기 떄문 )

#### faker.seed(number)로 seed 를 설정할시 반복해도 같은 값이 나온다.
### 1. Testing Product
#### /v1/testing/testingProduct 에 POST 방식으로 body 에 seed 를 담아서 보낼 시 , 해당 seed에 해당하는 Testing Product가 100개 생성되어 DB에 Insert 된다.

### 2. /v1/toss에 GET 방식으로 보낼 시 , Product 중 random으로 하나를 출력한다.
![image](https://user-images.githubusercontent.com/98307410/216811734-6b263f24-cdca-428a-ac25-1fefe4778a21.png)

#### 클릭시 결제를 진행 한다.
![image](https://user-images.githubusercontent.com/98307410/216811750-99903f73-2d5b-49be-afaf-e9caa902129c.png)

#### 결제 진행 후 , 결제 승인 요청 까지 진행 한다.
![image](https://user-images.githubusercontent.com/98307410/216811779-a2e56fdb-abbd-4342-b52f-2e1f0ee8ca8e.png)

#### 결제 승인이 완료되면 , 회원가입때 등록한 이메일로 메일을 보낸다.
![image](https://user-images.githubusercontent.com/98307410/216811797-fc63c968-908d-48f9-be39-83d9154119f4.png)

### 3. /v1/toss/payments에 GET 방식으로 요청을 보낼 시 , Login 한 유저가 결제한 기록들을 파싱하여 출력한다. 
#### ( Toss /v1/payments/{paymentKey} 사용 )
![image](https://user-images.githubusercontent.com/98307410/216832183-60f1bd2d-a26e-42be-b68c-6cc10a7c2e11.png)

### 4. /v1/toss/payment/:paymentKey에 GET 방식으로 요청을 보낼 시 , 결제에 대한 정보를 SMS로 보낸다.
![image](https://user-images.githubusercontent.com/98307410/216832313-d0c99d56-bf05-4512-8506-7589291ca081.png)


