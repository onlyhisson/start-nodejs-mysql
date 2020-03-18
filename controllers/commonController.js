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
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.dashboard,
  successFlash: "Welcome",
  failureFlash: "Can't log in. Check email and/or password"
});

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
      const hash = await bcrypt.hash(password, 12);
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
  req.logout();
  res.redirect(routes.home);
};
