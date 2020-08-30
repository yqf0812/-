const fs = require('fs');
const express = require('express');
const app = express();  

app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    let readStream = fs.createReadStream(__dirname + '/book.html', 'utf8');
    console.log(111)
    
    readStream.pipe(res);
    
});

const result = require('./output.json');
const a = require('./output1.json');
app.get('/categories', function (req, res) {
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j  < a.length; j++) {
            if (result[i].category === a[j].id) {
                result[i].category = a[j].name;
            }
        }
    }
    
    res.json({
        code: 0,
        msg: 'ok',
        data: result,
        total: result.length
    })
});

var server = app.listen(3000, function () {
    console.log('runing 3000...');
});