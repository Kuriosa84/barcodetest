var express = require('express');
var mongo = require('mongodb').MongoClient;
var port = process.env.PORT || 3000;

var app = express();

//var server = require('http').Server(app);
var db;

mongo.connect('mongodb://kuriosa:kuriosa123@ds233763.mlab.com:33763/kuriosatest', function(err, database) {
    if(err) {
        console.log(err);
    }
    db = database;
    console.log("Connected to mongo?");
});

app.get('/test', function(req, res) {
    console.log("Trying to find barcode");
    //var code = req.params.barcode;
    var code = req.query.barcode;

    db.collection('test').findOne({barcode: code}, function(err, obj) {
        if(err) {
            res.status(500).send(err);
            console.log("Error");
        } else if(obj == null) {
            res.status(401).send({});
            console.log("Name is null");
        } else {
            res.status(200).send(obj.name);
            console.log("Yaaay!");
        }
    });
});

app.get('/', function(req, res) {
    res.send('Test');
    console.log("Testar");
});

app.listen(port, function() {
    // Listening on port
    console.log("Listening on port 3000");
});