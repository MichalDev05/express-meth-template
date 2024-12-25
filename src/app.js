const express = require('express');
const xssClean = require('xss-clean');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const apiRoutes = require('./router/apiRoutes');
const frontendRoutes = require('./router/frontendRoutes');

const db = require('./db');

const app = express();
const port = process.env.PORT;

if (!port){
    console.log("PORT not found in .env file");
    process.exit();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(xssClean());


app.use('/api', apiRoutes);
app.use('/', frontendRoutes);


let server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});