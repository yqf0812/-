const fs = require('fs');
const express = require('express');
const app = express(); 
const deepCopy = require('./deepCopy');
const timesTamp = require('./timesTamp');

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
    let sliceArr = deepCopy(result);
    let timeArr = [];
    let total = 0;
    let offset = parseInt(req.query.offset) * parseInt(req.query.limit);
    console.log(req.query)
    //时间过滤
    if (req.query.month === '') {
        timeArr = sliceArr;
        total = result.length;
    } else {
        for (let i = 0; i < sliceArr.length; i++) {
            if (parseInt(sliceArr[i].time) >= timesTamp(req.query.month).start && parseInt(sliceArr[i].time) <= timesTamp(req.query.month).end) {
                timeArr.push(sliceArr[i])
            }
        }
        total = timeArr.length;
        // offset = 0 *  parseInt(req.query.limit);
    }
    // console.log(timeArr)
    //分页
    timeArr = timeArr.splice((offset), parseInt(req.query.limit));
    res.json({
        code: 0,
        msg: 'ok',
        data: timeArr,
        total: total
    })
});

var server = app.listen(3000, function () {
    console.log('runing 3000...');
});