const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./db/models');
const routes = require('routes');
const morgan = require('morgan');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static(path.join(__dirname, '/public')));

models.db.sync()
.then(() => {
    console.log("Tables Created");
    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    }) 
})
.catch(console.error.bind(console));