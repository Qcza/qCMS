import * as express from 'express';
import * as path from 'path';

var app = express();

app.use(express.static(path.resolve(__dirname)));
app.use('/css', express.static(__dirname + '/app/styles/'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts/'));

app.get('/', function (req: express.Request, res: express.Response) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.listen(3000);