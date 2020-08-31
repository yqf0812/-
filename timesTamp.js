module.exports = function timesTamp(val) {
//默认年份为2019年
    let startTime = '';
    let endTime = '';
    switch(val) {
        case 'jan':
            startTime = new Date('2019/01/01 00:00:00').getTime();
            endTime = new Date('2019/01/31 00:00:00').getTime();
            break;
        case 'feb':
            startTime = new Date('2019/02/01 00:00:00').getTime();
            endTime = new Date('2019/02/28 00:00:00').getTime();
            break;
        case 'mar':
            startTime = new Date('2019/03/01 00:00:00').getTime();
            endTime = new Date('2019/03/31 00:00:00').getTime();
            break;
        case 'apr':
            startTime = new Date('2019/04/01 00:00:00').getTime();
            endTime = new Date('2019/04/30 00:00:00').getTime();
            break;
        case 'may':
            startTime = new Date('2019/05/01 00:00:00').getTime();
            endTime = new Date('2019/05/31 00:00:00').getTime();
            break;
        case 'jun':
            startTime = new Date('2019/06/06 00:00:00').getTime();
            endTime = new Date('2019/06/30 00:00:00').getTime();
            break;
        case 'jul':
            startTime = new Date('2019/07/01 00:00:00').getTime();
            endTime = new Date('2019/07/31 00:00:00').getTime();
            break;
        case 'aug':
            startTime = new Date('2019/08/01 00:00:00').getTime();
            endTime = new Date('2019/08/31 00:00:00').getTime();
            break;
        case 'sep':
            startTime = new Date('2019/09/01 00:00:00').getTime();
            endTime = new Date('2019/09/30 00:00:00').getTime();
            break;
        case 'oct':
            startTime = new Date('2019/10/01 00:00:00').getTime();
            endTime = new Date('2019/10/31 00:00:00').getTime();
            break;
        case 'nov':
            startTime = new Date('2019/11/01 00:00:00').getTime();
            endTime = new Date('2019/11/30 00:00:00').getTime();
            break;
        case 'dec':
            startTime = new Date('2019/12/01 00:00:00').getTime();
            endTime = new Date('2019/12/31 00:00:00').getTime();
            break;
    }
    return {
        start: startTime,
        end: endTime
    }
}