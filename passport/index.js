import User from "../models/user";
const local = require('./localStrategy');
//const kakao = require('./kakaoStrategy');


const authenticate = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.find({ where: { id }})
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    local(passport);
};

module.exports = authenticate;
