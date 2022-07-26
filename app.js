/**
 * Declarations
 */

const crypto = require('crypto');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const nonce = crypto.randomBytes(16).toString("base64");

var routes = require('./app/routes');

/**
 * Express App Config
 */

app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"], 
          scriptSrc: ["'self'", 'https://cdn.jsdelivr.net', 'https://code.jquery.com', `'nonce-${nonce}'`],
          styleSrc: ["'self'", 'https://fonts.googleapis.com', 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
        },
      }
    })
);
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', routes);
app.use('/static', express.static(__dirname + '/app/static'));
app.locals._nonce = nonce;

/**
 * Run App
 */

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
  
