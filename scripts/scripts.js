let preNum = null;
let curNum = null;
let resNum = null;
let preop = null;
let opera = null;
let isNew = false;
let equalPressed = false;

document.querySelectorAll('.num').forEach(function (currentBtn) {
    currentBtn.addEventListener('click', addNum);
});

function reset() {
    preNum = null;
    curNum = null;
    resNum = null;
    preop = null;
    opera = null;
    isNew = false;
    equalPressed = false;
    updateResult("");
}

function addNum() {
    let resDiv = document.querySelector('#res');
    let text = resDiv.textContent;

    if (isNew || text === "NaN") {
        text = "";
    }
    if (text.length < 12) {
        text += this.getAttribute("value");
        isNew = false;
    }
    updateResult(text);
}

function addDot() {
    let res = getResult().toString();
    if (res.indexOf('.') === -1) {
        updateResult(res + '.');
    }
}

function negateNum() {
    let num = getResult();
    num *= -1;
    updateResult(num);
    if (preNum != null){
        preNum *= -1;
    }
}

function updateResult(num) {
    let resDiv = document.querySelector('#res');
    text = num.toString();
    if (text.length <= 12) {
        resDiv.textContent = text;
    } else if (number_test(num)) {
        resDiv.textContent = roundDic(num);
    } else {
        resDiv.textContent = "NaN";
    }
}

function number_test(n) {
    let bool;
    bool = (n - Math.floor(n)) !== 0
    console.log(n);
    console.log(bool);
    return bool;
}
function roundDic(num) {
    let text = num.toString();
    let index = text.indexOf('.');
    let before = text.substring(0, index);
    let dec = (num % 1).toFixed(12 - index);
    let res = Number(before) + Number(dec);
    console.log(before);
    console.log(dec);
    console.log("rest " + res);
    return res;
}

function getResult() {
    let resDiv = document.querySelector('#res');
    let num = Number(resDiv.textContent);
    return num;
}

function deleteLast() {
    let resDiv = document.querySelector('#res');
    let text = resDiv.textContent;
    text = text.substring(0, text.length - 1);
    resDiv.textContent = text;
}

function calculate(firNum, secNum, operator) {
    if (operator == "+") {
        return firNum + secNum;
    } else if (operator == "-") {
        return firNum - secNum;
    } else if (operator == "*") {
        return firNum * secNum;
    } else if (operator == "/") {
        return firNum / secNum;
    }
}


function pressed(op) {
    opera = op;
    isNew = true;
    if (preop == null) {
        preop = op;
    }

    if (equalPressed) {
        preop = op;
    } else
        if (preNum != null && curNum != null) {
            curNum = getResult();
            process();
            updateResult(resNum);
        } else if (preNum != null && curNum == null) {
            curNum = getResult();
            process();
            updateResult(resNum);
        } else {
            preNum = getResult();
        }
    preop = opera;
    equalPressed = false;
}

function process() {
    if (preNum != null && curNum != null) {
        resNum = calculate(preNum, curNum, preop);
        updateResult(resNum);
        preNum = resNum;
        curNum = null;
    } else if (preNum != null && curNum == null) {
        curNum = getResult();
        resNum = calculate(preNum, curNum, preop);
        updateResult(resNum);
        preNum = resNum;
        curNum = null;
    }
}

function equal() {
    /* if (preNum == null && curNum == null) {
        preNum = getResult();
    } */
    process();
    equalPressed = true;
}