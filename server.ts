import * as express from 'express';
import * as path from 'path';
import * as mongodb from 'mongodb';
import * as assert from 'assert';
import * as bodyParser from 'body-parser';

const MongoClient = mongodb.MongoClient
const dbUrl = 'mongodb://localhost:27017/qcms' 

const app = express();

app.use(bodyParser.json())

app.use('/', express.static(__dirname));
app.use('/css', express.static(__dirname + '/app/styles/'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/css', express.static(__dirname + '/static/font-awesome/css/'));
app.use('/fonts', express.static(__dirname + '/static/font-awesome/fonts/'));

// app.get('/', function (req: express.Request, res: express.Response) {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// });

//ADMIN >> NEW TEMPLATE
app.post('/templates', function (req: express.Request, res: express.Response) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    db.collection('templates').insertOne(req.body);
    db.close();
    let response:string = JSON.stringify({response: 'Document insert success'});
    res.send(response);
  })
})

app.get('/templates', function (req: express.Request, res: express.Response) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    let cursor:mongodb.Cursor = db.collection('templates').find();
    let response:string = JSON.stringify(cursor);
  res.send(response);
  })
})

app.listen(3000);