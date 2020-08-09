const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // レンダリングを行う
  res.render('./login');
  // res.render('./index.ejs', data);
});

app.get('/register', (req, res) => {
  // レンダリングを行う
  res.render('./register');
});

app.listen(3000);