var fs = require('fs');
var should = require('should');
var async = require('async');

var parser = require('../parser');

var html_files;

before((done) =>{

    async.mapValues({
        anagrafica: 'test/data/anagrafica.html',
        login_failed: 'test/data/login_failed.html'
    }, 
    (file, key, cb) => {
        fs.readFile(file, cb);
    }, (err, result) => {

        if (err) {
            done(err);
        }

        html_files = result;

        done();
    });
});


describe('parser', () => {
    describe('#parse', () => {
        it('should return a balance of -39.6 EUR', () => {

            parser.parse(html_files['anagrafica'], (err, data) => {

                should.not.exist(err);
                should.exist(data);

                data.should.have.property('balance', -39.6);
            });
        });
    });

    describe('#errors', () => {
        it('should return a list of errors from the login page', () => {

            parser.errors(html_files['login_failed'], (err, page) => {

                should.not.exist(err);
                should.exist(page);

                page.should.have.property('errors');

                page.errors.should.be.instanceof(Array).and.have.lengthOf(1);
                page.errors.should.containEql('Errore codice e password non riconosciuti.');
            });

        });
    });
});