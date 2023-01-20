# Back_Study
## File Processing Ability
#### Back_Study Root Folder 에서 public Folder/files 에 있는 File들을 사용한다.
#### 단 File 들은 해당 Project 안에 Folder를 만들어서 넣으며 Project 내 경로만 쓰고 , 뒤에 File 형식은 넣지 않는다. ( Folder 경로는 상관 X )
#### EX : "path":"\\src\\public\\files\\Yaml"
### 1. JSON File
#### /v1/files/json 에 POST 방식으로 body 에 path를 담아서 보낼 시 , 경로에 있는 json file을 읽어서 json 으로 Response 한다.
![image](https://user-images.githubusercontent.com/98307410/211825836-ec131955-2718-4b60-b800-670b69e75b71.png)
### 2. Xml File
#### /v1/files/xml 에 POST 방식으로 body 에 path를 담아서 보낼 시 , 경로에 있는 xml file을 읽어서 json 으로 Response 한다.
![image](https://user-images.githubusercontent.com/98307410/211826106-aab97fb3-30a5-4f79-b798-474f8e5482b3.png)
### 3. Csv File
#### /v1/files/csv 에 POST 방식으로 body 에 path를 담아서 보낼 시 , 경로에 있는 csv file을 읽어서 json 으로 Response 한다.
![image](https://user-images.githubusercontent.com/98307410/211827451-829df758-b876-40d8-afee-0817094d3f1a.png)
### 4. Yaml File
#### /v1/files/yaml 에 POST 방식으로 body 에 path를 담아서 보낼 시 , 경로에 있는 yaml file을 읽어서 json 으로 Response 한다.
![image](https://user-images.githubusercontent.com/98307410/211827381-51820118-cba4-4e9a-a57e-0f2d4d963ee6.png)

### 5. Exif File
#### 위 방식과 다르게 뒤에 File 형식도 넣는다 - MAC OS는 HPEC 형식 , Android는 JPG 형식 사용 때문
#### /v1/files/exif POST 방식으로 body 에 path를 담아서 보낼 시 사진 META data 중 make 와 latitude 와 longitude를 담아서 json 으로 Response 한다.
![image](https://user-images.githubusercontent.com/98307410/211829196-98cbb3b2-7ed6-4d40-902d-a83a4947ddae.png)
