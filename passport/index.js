import { User } from "../models";
const local = require('./localStrategy');
//const kakao = require('./kakaoStrategy');


const authenticate = (passport) => {
    
    // req.session 객체에 어떤 데이터를 저장할지 선택, user id 저장
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 매 요청시 실행, passport.session() 미들웨어가 이 메서드를 호출
    // 세션에 저장한 info를 통해 사용자 정보 객체 호출
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id }})
        .then(user => {
            done(null, user)
        })
        .catch(err => {
            done(err)
        });
    });

    local(passport);
};

module.exports = authenticate;
