const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // ログイン画面をレンダリング
  res.render('./login');
  // res.render('./index.ejs', data);
});

router.get('/register', (req, res) => {
  // ユーザ登録画面をレンダリング
  res.render('./register');
});

module.exports = router;