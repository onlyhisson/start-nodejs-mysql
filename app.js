import express from "express";
import expressLayouts from 'express-ejs-layouts';
import morgan from "morgan";                // logger
import helmet from "helmet";                // 보안 취약점 방지
import cookieParser from "cookie-parser";    // cookie 를 다루기 위해 필요 
import bodyParser from "body-parser";       // body 로부터 데이터 접근 가능
import session from "express-session";
import path from "path";
import flash from "express-flash";
import dotenv from "dotenv";
import passport from "passport";
import { localsMiddleware } from './middlewares';
import models from './models/index'

import routes from "./routes";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import postsRouter from './routers/postsRouter';

//import "./passport";  // passport 설정 파일(User 모델 생성 -> passport 선언 -> passport-local 기본설정)
import passportConfig from './passport'

const app = express();
dotenv.config();          // .env 파일에서 변수를 load
models.sequelize.sync();  // promise func, models 의 정보로 테이블 생성
passportConfig(passport);

app.use(helmet());                                  // application 보안
app.set('view engine', 'ejs');                      // 템플릿 설정
app.set('views', path.join(__dirname, 'views'));    // view 경로

// express-ejs-layouts setting
app.set('layout', 'layouts/main');      // default layout
app.set('layout extractScripts', true);
app.use(expressLayouts);

app.use('/public', express.static(__dirname + '/public', {}));
app.use('/images', express.static(__dirname + '/public/images', {}));
app.use('/assets', express.static(__dirname + '/public/assets', {}));

app.use(cookieParser());
app.use(bodyParser.json());                         // 데이터 전송시 서버가 json 인 것을 알도록
app.use(bodyParser.urlencoded({ extended: true })); // request 정보에서 form이나 json 형태의 body를 검사
app.use(morgan("dev"));
app.use(
    session({
      secret: process.env.COOKIE_SECRET,  // 서버에서 session ID 암호화 저장시 사용
      resave: false,                      // 요청하는 동안 세션을 항상 강제 저장 여부
      saveUninitialized: false,           // 초기화하지 않고 스토어에 세션 저장 여부
      cookie: {
        httpOnly: true,
        secure: false,
      }
    })
  );
app.use(flash()); // 내부적으로 session을 사용하기 때문에 session 아래에 미들웨어 사용

app.use(passport.initialize()); // passport 초기화, 설정 setting
app.use(passport.session());    // 로그인을 지속시키기 위해 세션 사용, req.session 객체에 passport 정보 저장

app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.posts, postsRouter);
app.use(routes.api, apiRouter);

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.status = status;
  res.status(status);
  res.render('error', {
    pageTitle: "Error Page",
    layout: 'layouts/main-public',
  })
});

export default app;