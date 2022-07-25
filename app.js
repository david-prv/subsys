/**
 * Declarations
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

var routes = require('./app/routes');

/**
 * Express App Config
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', routes);

/**
 * Run App
 */

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
  