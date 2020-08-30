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
    console.log(req.query)
    console.log(parseInt(req.query.offset))
    console.log(result)
    let sliceArr = result.slice(parseInt(req.query.offset), parseInt(req.query.limit));
    
    res.json({
        code: 0,
        msg: 'ok',
        data: sliceArr,
        total: result.length
    })
});

var server = app.listen(3000, function () {
    console.log('runing 3000...');
});