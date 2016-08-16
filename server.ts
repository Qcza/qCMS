import * as express from 'express';
import * as path from 'path';
import * as mongodb from 'mongodb';
import * as assert from 'assert';

const MongoClient = mongodb.MongoClient
const dbUrl = 'mongodb://localhost:27017/qcms' 


const app = express();
app.listen(3000);

app.use(express.static(path.resolve(__dirname)));
app.use('/css', express.static(__dirname + '/app/styles/'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts/'));

app.get('/', function (req: express.Request, res: express.Response) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

//ADMIN >> NEW TEMPLATE
app.post('/templates', function (req: express.Request, res: express.Response) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    console.log('Connected to mongodb')
    console.log(req)

    db.close();
  })
})
