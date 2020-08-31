const fs = require('fs');
const express = require('express');
const app = express(); 
const deepCopy = require('./deepCopy');
const timesTamp = require('./timesTamp');
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    let readStream = fs.createReadStream(__dirname + '/book.html', 'utf8');
    
    readStream.pipe(res);
    
});

const result = require('./output.json');
const a = require('./output1.json');
app.get('/categories', function (req, res) {
    let sliceArr = deepCopy(result);
    let timeArr = [];
    let spliceArr = [];
    let total = 0;
    let income = 0; //当前月收入金额
    let expenditure = 0; //当前月支出金额
    let allIncome = 0; //全年收入
    let allExpenditure = 0; //全年支出
    let offset = parseInt(req.query.offset) * parseInt(req.query.limit);
    //分类筛选
    console.log(req.query.type)
    if (req.query.type === '') {
        timeArr = sliceArr;
        total = result.length;
    } else {
        for (let i = 0; i < sliceArr.length; i++) {
            for (let j = 0; j < ((req.query.type).split(",")).length; j++) {
                if (((req.query.type).split(","))[j] === sliceArr[i].category) {
                    console.log(1)
                    timeArr.push(sliceArr[i])
                }
            }
        }
        total = timeArr.length;
        console.log(total)
        console.log(timeArr)
    }
    //统计全年支出与收入的金额
    for (let j = 0; j < sliceArr.length; j++) {
        if (sliceArr[j].type === '1') {
            allIncome = allIncome + parseInt(sliceArr[j].amount);
        } else {
            allExpenditure = allExpenditure + parseInt(sliceArr[j].amount);
        }
    }
    //时间过滤
    if (req.query.month === '') {
        total = timeArr.length;
    } else {
        for (let i = 0; i < timeArr.length; i++) {
            if (parseInt(timeArr[i].time) >= timesTamp(req.query.month).start && parseInt(timeArr[i].time) <= timesTamp(req.query.month).end) {
                spliceArr.push(timeArr[i])
            }
        }
        timeArr = spliceArr;
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
    //将分类的key值和name对应
    for (let i = 0; i < timeArr.length; i++) {
        for (let j = 0; j < a.length; j++) {
            if (timeArr[i].category === a[j].id) {
                timeArr[i].category = a[j].name;
            }
        }
    }
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
app.post('/postData', jsonParser, function (req, res) {
    let data = {
        time: String(req.body.time),
        category: req.body.type,
        type: req.body.shouzhi,
        amount: String(req.body.mony)
    }
    result.unshift(data);
    fs.writeFileSync('output.json', JSON.stringify(result));
    res.json({
        code: 0,
        msg: 'ok'
    })
});

var server = app.listen(3000, function () {
    console.log('runing 3000...');
});