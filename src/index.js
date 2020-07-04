const express = require('express');
const bodyParser = require('body-parser');

const port = 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./controllers/authController')(app);

app.listen(port, function() {
    console.log('rodando na porta '+port)
})