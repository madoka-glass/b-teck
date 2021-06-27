const express = require('express');
const app = express();
const router = require('./config/router');
const port = 3000
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});