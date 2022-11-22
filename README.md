# Start Node JS

## Version Info

_CentOS Linux release 7.7.1908 (Core)_

_Node JS v12.12.0_

_Mysql v14.14 Distrib 5.7.29_

_Pm2 v3.5.1_

### DB 데이터베이스 & 사용자 추가

CREATE DATABASE [데이터베이스명] default CHARACTER SET UTF8;

CREATE USER '[사용자명]'@'localhost' IDENTIFIED BY '[비밀번호]';

GRANT ALL PRIVILEGES ON _._ TO '[사용자명]'@'localhost';

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

# MySQL - production
DB_USER=사용자명
DB_PW=비밀번호
DB_HOST=127.0.0.1
DB_NAME=데이터베이스명

# MySQL - development
DB_USER_DEV=사용자명
DB_PW_DEV=비밀번호
DB_HOST_DEV=127.0.0.1
DB_NAME_DEV=개발데이터베이스명
```

### Node Module install

$ npm install

### 프로그램 실행

$ npm run-script start

### 브라우저

http://아이피:3000
