var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));

app.use(bodyParser.json());


var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/dreamhouse';

if (process.env.DATABASE_URL !== undefined) {
  pg.defaults.ssl = true;
}

var client = new pg.Client(connectionString);
client.connect();

var orderTable = 'order__c';
var accountTable = 'account';

// setup the demo data if needed
client.query('SELECT * FROM salesforce.account', function(error, data) {
  if (error !== null) {
    console.log('connectionurl'+ connectionString);
    client.query('SELECT * FROM account', function(error, data) {
      if (error !== null) {
        console.log('Loading Demo Data...');
        //require('./db/demo.js')(client);
        //console.log('Done Loading Demo Data!');
      }
    });
  }
  else {
    console.log('in else condition server.js...');
    var schema = 'salesforce.';
    orderTable = schema + 'order__c';
    accountTable = schema + 'account';
  }
});


app.get('/order', function(req, res) {
  client.query('SELECT * FROM ' + orderTable, function(error, data) {
    res.json(data.rows);
  });
});

app.get('/account', function(req, res) {
  client.query('SELECT * FROM ' + accountTable, function(error, data) {
    res.json(data.rows);
  });
});

app.get('/account/:sfid', function(req, res) {
  client.query('SELECT * FROM ' + accountTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data.rows[0]);
  });
});

var port = process.env.PORT || 8200;

app.listen(port);

//console.log('Listening at: http://localhost:' + port);
