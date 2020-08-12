const express = require('express');
const app = express();
const router = require('./config/router');
const port = 3000

app.set('view engine', 'ejs');

app.use('/', router);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});