var express = require('express');
var mongo = require('mongodb').MongoClient;
var port = 3000;

var app = express();

var server = require('http').Server(app);
var db;

mongo.connect('mongodb://kuriosa:kuriosa123@ds233763.mlab.com:33763/kuriosatest', function(err, database) {
    if(err) {
        console.log(err);
    }
    db = database;
});

server.listen(port, function() {
    // Listening on port
});

app.get('/test/:barcode', function(req, res) {
    var code = req.params.barcode;

    db.collection('test').findOne({barcode: code}, function(err, name) {
        if(err) {
            res.status(500).send(err);
        } else if(name == null) {
            res.status(401).send({});
        } else {
            var responseObject = { name: name };
            res.status(200).send(responseObject);
        }
    });
});