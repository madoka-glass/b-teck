const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require('express-session');
const User = require('../../models/user');

class Authenticator {
  static initialize(router) {
    // セッションの設定
    router.use(session({
      secret: 'secret word',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 1000
      }
    }));

    // passportの初期化
    router.use(passport.initialize());

    // セッション管理をするための設定
    router.use(passport.session());

    // ログイン後に指定のオブジェクトをシリアライズ
    passport.serializeUser(function (user, done) {
      done(null, user.mailAddress);
    });

    // メールアドレスを元にデシリアライズ
    passport.deserializeUser(function (mailAddress, done) {
      User.findOne({ mailAddress: mailAddress }, function (err, user) {
        done(err, user);
      });
    });
  }

  static setStrategy() {
    passport.use(new LocalStrategy({ usernameField: 'mailAddress' }, function (username, password, done) {
      // ここで mailAddress と password を確認して結果を返す
      User.findOne({ mailAddress: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'ユーザー名が間違っています。' });
        }
        if (user.password !== password) {
          return done(null, false, { message: 'パスワードが間違っています。' });
        }
        return done(null, user);
      });
    }));
  }

  static authenticate(req, res) {
    passport.authenticate('local',
      {
        successRedirect: '/home',
        failureRedirect: '/login',
        session: true,
        failureFlash: 'ユーザーIDかパスワードが間違っています。'
      })(req, res);
  }

  // 認証が完了しているか確認(routes内で使う)
  static isAuthenticated(req, res, next) {
    // 認証が完了している時は次の処理に進む
    if (req.isAuthenticated()) {
      return next();
    } else {
      // 認証が終わっていなかったらログイン画面にリダイレクトする
      return res.redirect('/');
    }
  }
}

module.exports = Authenticator;
