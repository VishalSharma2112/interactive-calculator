const placevalue = document.querySelector('.input-js');

function numberClick(num){
    num = String(num);

    if(placevalue.value === '' || placevalue.value === '0'){
        if(num==='00'){
            placevalue.value='0';
        }
        else{
            placevalue.value = num;
        }
        return;
    }


    placevalue.value = placevalue.value+num;
}

function ACjs(){
    placevalue.value = '';
    document.querySelector('.history-js').innerHTML = '';
}

function Deljs(){
    if(placevalue.value === '' || placevalue.value === '0'){
        return;
    }else{
        placevalue.value = placevalue.value.slice(0, -1);
        if(placevalue.value.slice(-1)==='.'){
            placevalue.value = placevalue.value.slice(0, -1);
        }
    }
}

function OperatorClick(ops) {
    let value = placevalue.value;
    let lastChar = value.slice(-1);
    let lastTwo = value.slice(-2);

    // Empty or 0 → only allow minus
    if (value === '' || value === '0') {
        if (ops === '-') {
            placevalue.value = '-';
        }
        return;
    }

    // If expression ends with x- or /-
    if (lastTwo === 'x-' || lastTwo === '/-') {
        return; // wait for a number
    }

    // If last char is operator
    if (['+', '-', 'x', '/'].includes(lastChar)) {

        // Allow x- or /-
        if ((lastChar === 'x' || lastChar === '/') && ops === '-') {
            placevalue.value += ops;
            return;
        }

        // Replace last operator
        placevalue.value = value.slice(0, -1) + ops;
        return;
    }

    // Normal append
    placevalue.value += ops;
}

function DecimalClick() {
    let value = placevalue.value;

    if (value === '' || value === '-') {
        placevalue.value += '0.';
        return;
    }

    let lastOpIndex = Math.max(
        value.lastIndexOf('+'),
        value.lastIndexOf('-'),
        value.lastIndexOf('x'),
        value.lastIndexOf('/')
    );

    let currentNumber = value.slice(lastOpIndex + 1);

    if (currentNumber.includes('.')) {
        return;
    }

    placevalue.value += '.';
}

function EqualClick() {
    let expression = placevalue.value;
    const history = document.querySelector('.history-js');

    if (expression === '' || expression === '-') return;

    let lastChar = expression.slice(-1);
    if (['+', '-', 'x', '/', '.'].includes(lastChar)) {
        expression = expression.slice(0, -1);
    }

    history.innerHTML = expression+' =';

    expression = expression.replace(/x/g, '*');

    try {
        let result = eval(expression);

        if (!isFinite(result)) {
            placevalue.value = 'Error';
            return;
        }

        placevalue.value = Number(result.toFixed(10)).toString();
    } catch (error) {
        placevalue.value = 'Error';
    }
}

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'Backspace'){
        Deljs();
    }
    else if(event.key === 'Escape'){
        ACjs();
    }
    else if(event.key === 'Enter'){
        EqualClick();
    }
    else if ('0123456789'.includes(event.key)) {
        numberClick(event.key);
    }
    else if(['+', '-', '/', '*', '%'].includes(event.key)){
        let op = event.key === '*' ? 'x' : event.key;
        OperatorClick(op);
    }
    else if (event.key === '.'){
        DecimalClick();
    }
})