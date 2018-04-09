const express = require('express');
const app     = express();
const cors    = require('cors');
const bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://rizki2:1234@localhost:27017/toko';

MongoClient.connect(url, function(err, db) {
    console.log("Terhubung ke MongoDB");
});

app.use(cors());
app.use(bodyParser.json());

app.get('/data', (req, res)=>{
    MongoClient.connect(url, (err, db)=>{
        var collection = db.collection('pedagang')
        collection.find({}).toArray((err, docs)=>{
            console.log(docs);
            res.send(docs);
        });
    });
});

app.post('/data', (req, res)=>{
    MongoClient.connect(url, (err, db)=>{
        var data = {nama:req.body.nama, usia:req.body.usia, alamat:req.body.alamat};
        var collection = db.collection('pedagang');
        collection.insert(data, (err, result)=>{
            console.log(result);
            res.send(result);
        });
    });
});

app.listen(3300, ()=>{
    console.log('Server @Port 3300')
});