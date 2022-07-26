/**
 * Declarations and Imports
 */

const express = require('express');
const dir = "../app/views";
const bodyParser = require('body-parser');
const csrf = require('csurf');

var router = express.Router();
var submissionController = require('./controller/submissionController');
var identificationController = require('./controller/identificationController');
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

/**
 * Views
 */

router.route('/').get(csrfProtection, function(req, res) {
    res.render(dir + '/index', {nonce: res.app.locals._nonce, csrf: req.csrfToken()});
});

router.route('/register').get(csrfProtection, function(req, res) {
    res.render(dir + '/register', {nonce: res.app.locals._nonce, csrf: req.csrfToken()});
});

router.route('/welcome').get(csrfProtection, function(req, res) {
    res.render(dir + '/welcome', {nonce: res.app.locals._nonce, csrf: req.csrfToken()});
});

/**
 * Workflow
 */

router.route('/flag').post(parseForm, csrfProtection, submissionController.submitFlag, submissionController.creditFlag, submissionController.checkForGift);

router.route('/register').post(parseForm, csrfProtection, identificationController.registerId);

module.exports = router;
