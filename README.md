Start Node JS
=============


Version Info
-------------
*CentOS Linux release 7.7.1908 (Core)*

*Node JS  v12.12.0*

*Mysql    v14.14 Distrib 5.7.29*

*Pm2      v3.5.1*

### DB 데이터베이스 & 사용자 추가

CREATE DATABASE [데이터베이스명] default CHARACTER SET UTF8;

CREATE USER '[사용자명]'@'localhost' IDENTIFIED BY '[비밀번호]';

GRANT ALL PRIVILEGES ON *.* TO '[사용자명]'@'localhost';

FLUSH PRIVILEGES;

### 소스복사
$ cd 상위경로

직접 복사

or 

cd 상위경로

$ git clone https://github.com/onlyhisson/start-nodejs-mysql.git


### 환경 설정 파일 
$ cd 상위경로/start-nodejs-mysql

$ vi .env

아래의 내용으로 편집 

```
# Global
NODE_ENV=development
DEBUG=restapi:server
COOKIE_SECRET=nodejsmysqlsecret
PORT=3000

# MySQL
DB_USER=사용자명
DB_PW=비밀번호
DB_HOST=127.0.0.1
DB_NAME=데이터베이스명
DB_DEV=개발데이터베이스명
DB_TEST=테스트데이터베이스명
```

### Node Module install
$ npm install

### 프로그램 실행
$ npm run-script start

### 브라우저 
http://아이피:3000




