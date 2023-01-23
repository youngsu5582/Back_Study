# Back_Study
## SQL Processing Ability

#### number는 Int , string은 varchar 와 동일하다.
#### Id는 Int형 , primaryKey , autoIncrement 한다.

### User Model
#### Attribute
userId(integer) , email(string) , password(string)
#### Relation
User 1 : N Post

### Post Model
#### Attribute
postId(integer) , title(string) , content(text) , userId(foreign key) , date(Date) , views(integer) , like_count(integer)
#### Relation
Post N : 1 User
Post 1 : N Comment

### Comment Model ( 편의상 author는 foreign key 가 아닌 string )
#### Attribute
commentId(integer) , content(string) , author(string) , postId(foreign key) ,date(Date)
#### Relation
Comment N : 1 Post

#### faker.seed(number)로 seed 를 설정할시 반복해도 같은 값이 나온다.
### 1. Testing User
#### /v1/testing/testingUser 에 POST 방식으로 body 에 seed 를 담아서 보낼 시 , 해당 seed에 해당하는 Testing User가 100개 생성되어 DB에 Insert 된다.
![image](https://user-images.githubusercontent.com/98307410/214062850-d697c766-5b37-44db-99c1-33cf96687656.png)
![image](https://user-images.githubusercontent.com/98307410/214064236-76e5f32c-48ab-4210-aec5-d7cb2b2d7833.png)


### 2. Testing Post
#### /v1/testing/testingPost 에 POST 방식으로 body 에 seed 를 담아서 보낼 시 , 해당 seed에 해당하는 Testing Post가 100개 생성되어 DB에 Insert 된다.
#### ( 앞서 , 생성한 User에서 random으로 받아서 userId를 Post에 넣는다. )
![image](https://user-images.githubusercontent.com/98307410/214063824-b6908743-b4df-4804-8e5d-1422ac6facb5.png)
![image](https://user-images.githubusercontent.com/98307410/214064373-bdcdcd25-6af0-4da8-8a2a-6fa373e51266.png)

### 3. getPosts
#### /v1/post/list에 GET 방식으로 query에 type 과 count를 담아서 보낼 시 , 해당 type에 해당하는 게시물을 count 개수 만큼 Response 해준다.
#### type이 most 일시 , 조회수가 가장 많은 Post 순서대로 count 개수만큼 Response한다.
#### type이 recent 일시, 가장 최근 생성된 Post 순서대로 count 개수만큼 Response한다.
![image](https://user-images.githubusercontent.com/98307410/214065490-b881765b-b550-452d-bc14-44ea76a1fa58.png)
![image](https://user-images.githubusercontent.com/98307410/214065555-c0428cf9-e7f3-4605-b3e0-33b3057dff9a.png)
### 4. getPost
#### /v1/post/search에 GET 방식으로 query에 type 과 text를 담아서 보낼 시 , 해당 type에 해당하는 게시물을 text로 검색하여 Response 해준다.
#### type이 title 일시 , 해당 제목이 포함된 Post를 검색한다.
#### type이 content일시 , 해당 내용이 포함된 Post를 검색한다.
#### type이 writer일시 , 작성자와 일치하는 Post를 검색한다.
![image](https://user-images.githubusercontent.com/98307410/214066467-4c15f515-bf80-45b4-8591-21253593b0ed.png)
![image](https://user-images.githubusercontent.com/98307410/214066879-11d477e5-688a-4d50-b786-ded4d0ebd0f1.png)


