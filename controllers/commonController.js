import passport from "passport";
import bcrypt from "bcrypt";
import routes from "../routes";
import { User }  from "../models";
import { errorHandler } from "../public/js/common";

const LAYOUT = 'layouts/main-public';

// Home
export const home = async (req, res) => {

  try {
    res.render("home", { 
      pageTitle: "Home", 
      layout: LAYOUT,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

// Dashboard
export const dashboard = async (req, res) => {

  try {
    res.render("dashboard", { 
      pageTitle: "Dashboard", 
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

// Login Page
export const getLogin = async (req, res) => {
  res.render("login", { pageTitle: "Log In", layout: LAYOUT });
}

// Login Request
// LocalStrategy => passport.authenticate => passport.serializeUser => passport.deserializeUser
export const postLogin = async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {

    if(authError) { // 코드 에러 등 기타 에러 발생시
      console.log(authError);
      return next(authError);
    }

    if(!user) {     // 아이디/비밀번호에 해당하는 사용자 없을시
      req.flash('error', info.message);
      return res.redirect('/login');
    }

    // Passport가 req에 login 메소드를 추가한다.
    return req.login(user, (loginError) => {  // req.login는 passport.serializeUser 를 호출
      if(loginError) {
        console.log(loginError);
        return next(loginError);
      }
      req.flash('success', 'login successful.');
      return res.redirect('/');
    })
  })(req, res, next)
  
}

// Join Page
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join", layout: LAYOUT });
};

// Join Request
export const postJoin = async (req, res, next) => {
  
  const { body: { name, email, password, password2 } } = req;

  try {
    const exUser = await User.findOne( {where: { email } });

    if(exUser) {
      req.flash("error", "Email already exist");
      res.render("join", { pageTitle: "Join", layout: LAYOUT });
    } else if (password !== password2) {
      req.flash("error", "Passwords don't match");
      //res.status(400);
      res.render("join", { pageTitle: "Join", layout: LAYOUT });
    } else {
      const hash = await bcrypt.hash(password, 12); // 12 이상 추천, 31까지 가능
      await User.create({
        name,
        email,
        password: hash
      })
      next();
    }
  /*
    
      const user = await User({ name, email });
      await User.register(user, password);
      
  */
    } catch (error) {
      errorHandler(req, res, error);
    }

};

// Logout
export const logout = (req, res) => {
  req.flash("info", "Logged out, see you later");
  req.logout(); // Passport가 req에 logout 메소드를 추가한다.
  res.redirect(routes.home);
};
