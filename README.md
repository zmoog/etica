# Etica web scraper

Scrape the Etica Soluzioni portal for parents to mine user data. Requires a valid login for the web application.

## Install

```bash
$ npm install git://github.com/zmoog/etica.git#0.2.1 --save
```

## Usage

```js
  var etica = require('etica');

  etica.scrape('user', 'secret', (err, data) => { 
    console.log(err, data);
  });
  // null { balance: -93.6 }
```
