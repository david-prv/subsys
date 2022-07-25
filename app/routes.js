/**
 * Declarations and Imports
 */

const express = require('express');
const dir = "../app/views";

var router = express.Router();
var submissionController = require('./controller/submissionController');
var identificationController = require('./controller/identificationController');

/**
 * Views
 */

router.route('/').get(function(req, res) {
    res.render(dir + '/index');
});

router.route('/register').get(function(req, res) {
    res.render(dir + '/register');
});

/**
 * Workflow
 */

router.route('/flag').post(function(req, res) {
    submissionController.submitFlag(req, res);
});

router.route('/register').post(function(req, res) {
    identificationController.registerId(req, res);
});

module.exports = router;