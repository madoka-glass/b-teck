const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const userRegistValidator = require('../middleware/validators/userRegistValidator');
const mongoose = require('mongoose');
const User = require('../models/user');
const Authenticator = require("../middleware/auth/authenticator");
let errors = [];

mongoose.connect('mongodb://localhost/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// passportの初期化
Authenticator.initialize(router);

// 認証情報の設定
Authenticator.setStrategy();

router.get('/', (req, res) => {
  // ログイン画面をレンダリング
  res.render('./login');
});

router.get('/register', (req, res) => {
  // ユーザ登録画面をレンダリング
  res.render('./register', {
    username: '',
    mailAddress: '',
    errMsg: ''
  });
});

router.post('/register', userRegistValidator, (req, res) => {
  // バリデーション結果のチェック
  errors = validationResult(req);
  //エラーの有無に応じて画面をレンダリング
  if (!errors.isEmpty()) {
    //ユーザ登録画面を再レンダリング
    res.render('./register', {
      username: req.body.username,
      mailAddress: req.body.mailAddress,
      errMsg: errors.array()
    });
  } else {
    //登録するユーザオブジェクトの作成
    const user = new User();
    user.username = req.body.username;
    user.mailAddress = req.body.mailAddress;
    user.password = req.body.password;
    // MongoDBに保存
    user.save(function (err) {
      if (!err) {
        // ホーム画面へリダイレクト
        res.redirect(307, '/home');
      } else {
        return res.status(500).send('user create faild.');
      }
    });
  }
});

router.post('/home', (req, res) => {
  Authenticator.authenticate(req, res)
});

router.get('/home', Authenticator.isAuthenticated, (req, res) => {
  // ホーム画面をレンダリング
  res.render('./home', { name: req.user.username });
});

module.exports = router;