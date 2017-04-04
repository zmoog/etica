var cheerio = require('cheerio');
var numeral = require('numeral');

module.exports.parse = (data, callback) => {

    var $ = cheerio.load(data);
    $('select#ddlAS > option[selected=selected]').each(function(_, element) { 
    
        var price = $(element).text();
        var price_parsed = parseFloat(price.replace(/[^\d\.,-]/g,'').replace(',', '.'))
        var balance = numeral(price_parsed)._value;

        callback(null, {
            balance: balance
        });

    });
};


module.exports.errors = (data, callback) => {

    var $ = cheerio.load(data);

    var matched = $('#divErrori > span').each(function(_, element) { 
    
        var text = $(element).text().trim();

        callback(null, {
            errors: [text]
        });

    }).length;

    console.log('matched: ', matched);

    if (matched < 1) {
        callback(null, {
            errors: []
        });
    }

};

