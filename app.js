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
    let income = 0; //当前月收入金额
    let expenditure = 0; //当前月支出金额
    let allIncome = 0; //全年收入
    let allExpenditure = 0; //全年支出
    let offset = parseInt(req.query.offset) * parseInt(req.query.limit);
    //统计全年支出与收入的金额
    for (let j = 0; j < sliceArr.length; j++) {
        if (sliceArr[j].type === '1') {
            allIncome = allIncome + parseInt(sliceArr[j].amount);
        } else {
            allExpenditure = allExpenditure + parseInt(sliceArr[j].amount);
        }
    }
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
    }
    //统计支出与收入的金额
    for (let j = 0; j < timeArr.length; j++) {
        if (timeArr[j].type === '1') {
            income = income + parseInt(timeArr[j].amount);
        } else {
            expenditure = expenditure + parseInt(timeArr[j].amount);
        }
    }
    //分页
    timeArr = timeArr.splice((offset), parseInt(req.query.limit));
    res.json({
        code: 0,
        msg: 'ok',
        data: timeArr,
        total: total,
        income: income,
        expenditure: expenditure,
        allIncome: allIncome,
        allExpenditure: allExpenditure
    })
});

var server = app.listen(3000, function () {
    console.log('runing 3000...');
});