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
postId(integer) , title(string) , content(string) , userId(foreign key) , date(Date) , views(integer) , like_count(integer)
#### Relation
Post N : 1 User
Post 1 : N Comment

### Comment Model ( 편의상 author는 foreign key 가 아닌 string )
#### Attribute
commentId(integer) , content(string) , author(string) , postId(foreign key) ,date(Date)
#### Relation
Comment N : 1 Post


