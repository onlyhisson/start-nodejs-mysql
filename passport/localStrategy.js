//const LocalStrategy = require('passport-local').Strategy;
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../models';

const LocalStrategy = passportLocal.Strategy;

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email }});
            if(!exUser) {
                done(null, false, { message: "Can't log in. Check email and/or password" });
            } else {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: "Can't log in. Check email and/or password" });
                }
            }
        } catch (error) {
            done(error);
        }
    }));
};
