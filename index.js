var request = require('request').defaults({
    jar: true
});
var parser = require('./parser');
var _ = require('lodash');


var URL_LOGIN = 'https://www3.eticasoluzioni.com/verolengoportalegen/login.aspx'
var URL_ANAGRAFICA = 'https://www3.eticasoluzioni.com/verolengoportalegen/anagrafica.aspx';
var STATUS_CODE_AFTER_SUCCESSFUL_LOGIN = 302;
var LOCATION_HEADER_AFTER_SUCCESSFUL_LOGIN = '/verolengoportalegen/default.aspx';

var defaultForm = require('./default-form.json');


module.exports.load = function(username, password, callback) {

    var form = _.defaults({txtUserName: username, txtPassword: password}, defaultForm);

    console.log('Logging on Etica website');

    request.post(URL_LOGIN, {form: form}, function(err, response, data) {

        if (err) {
            callback(err, null);
            return;
        }

        // console.log(response.statusCode, response.headers);

        if (response.statusCode != STATUS_CODE_AFTER_SUCCESSFUL_LOGIN || LOCATION_HEADER_AFTER_SUCCESSFUL_LOGIN !== response.headers['location']) {

            callback({
                message: 'Login failed, expected statusCode %d and a header location but found %d and a location header %s ' 
                // STATUS_CODE_AFTER_SUCCESSFUL_LOGIN,
                // response.statusCode,
                // response.headers['location']
            }, null);

            return;
        }

        console.log('Login successful');
        console.log('Getting data from the Anagrafica page..')

        request.get(URL_ANAGRAFICA, function(err, _, data) {

            if (err) {
                console.log('err' + err)
                callback(err, null);
            }

            parser.parse(data, callback);
        });
    });

};