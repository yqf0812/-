const fs = require('fs');
const express = require('express');
const app = express();  

app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    let readStream = fs.createReadStream(__dirname + '/book.html', 'utf8');
    console.log(111)
    
    readStream.pipe(res);
    
});

const resule = require('./output.json');
app.get('/categories', function (req, res) {
    res.json({
        code: 0,
        msg: 'ok',
        data: resule
    })
});

var server = app.listen(3000, function () {
    console.log('runing 3000...');
});