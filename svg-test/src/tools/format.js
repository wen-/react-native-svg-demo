
/*
* 参数说明：
* number：要格式化的数字
* separator：千分位符号
* decimals：保留几位小数
*/
function numberFormat(number, separator, decimals) {
    let newNum = (+((number + '').replace(/[^0-9-.]/g, ''))).toFixed(decimals);
    let sep = separator||',';
    let s = [];

    s = newNum.split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }
    return s.join(".");
}

export {
    numberFormat
}