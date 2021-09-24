const body = document.querySelector("body");
const clearBtn = document.getElementById("calc-clear");
const allNumbers= document.getElementsByClassName("calc-btn-num");
const symbols = document.getElementsByClassName("calc-btn-op");
const eqBtn = document.getElementById("calc-eq");
const backspace = document.getElementById("calc-backspace");

const allButs = document.getElementsByClassName(".calc-btn");

const display = document.getElementById("calc-display");
const display2 = document.getElementById("op-display");
const display3 = document.getElementById("calc-display2");

let sign = '';
let result = null;
let outputOne = '';
let outputTwo = '';
let dot = false;

//audio
var click = new Audio();
var alertz = new Audio();
alertz.src = "./fx/alert.wv";    
click.src = "./fx/click.wav";


function playSound(sound){

    if(sound) {  
        sound.currentTime = 0;       
        sound.play();                
    }
}



Array.from(allButs).forEach(btn => {
    btn.addEventListener('click', playSound(click));
})

Array.from(allNumbers).forEach(num => {
    num.addEventListener('click', displayNumber);
});

function displayNumber(e) {
    if (e.target.innerText === '.' && !dot) {
        dot = true;
    } else if (e.target.innerText === '.' && dot) {
        return;
    }
    outputTwo += e.target.innerText;
    display3.innerText = outputTwo;
    if (outputTwo.length > 10) {
        playSound(alertz);
        alert("wow!");
        outputTwo = '';
    };
}

Array.from(symbols).forEach(symbol => {
    symbol.addEventListener('click', displayResult);
});

function displayResult(e) {
    if (!outputTwo) result;
    dot = false;
    const signName = e.target.innerText;

    if (outputOne && outputTwo && sign) {
        checkCalc();
    } else {
        result = parseFloat(outputTwo);
    }
    clearMainDisplay(signName);
    sign = signName;
}

function checkCalc() {
    if (sign === 'x') {
        result = parseFloat(result) * parseFloat(outputTwo);
    } else if (sign === '+') {
        result = parseFloat(result) + parseFloat(outputTwo);
    } else if (sign === '-') {
        result = parseFloat(result) - parseFloat(outputTwo);
    } else if (sign === '÷') {
        result = parseFloat(result) / parseFloat(outputTwo);
    } 
}

function clearMainDisplay(name = '') {
    outputOne += outputTwo + ' ' + name + ' ';
    display2.innerText = outputOne;
    display3.innerText = '';
    display.innerText = result;
    outputTwo = '';
}

eqBtn.addEventListener('click', calc);

eqBtn.addEventListener('click', deleteMemory);
function calc() {
    if(!outputOne || !outputTwo) {
        return;
    } else {
        checkCalc();
        clearMainDisplay();
        display3.innerText = result;
        outputTwo = result;
        deleteMemory();
    }
}

clearBtn.addEventListener('click', deleteAll);
backspace.addEventListener('click', deleteLastInput);
backspace.addEventListener('dblclick', deleteMemory);

function deleteAll() {
    display.innerText = '0';
    display2.innerText = '';
    display3.innerText = '';
    outputOne = '';
    result = '';
}

function deleteLastInput() {
    display3.innerText = '';
    outputTwo = '';
}

function deleteMemory() {
    display2.innerText = '';
    outputOne = '';
}


// visual


const changeBackground = function() {
    body.style.backgroundColor = getColor();
    // display2.style.color = getColor();
    // display3.style.color = getColor();
}

function getColor() {
    let color = ["#"];
    for (let i = 0; i < 3; i++){
        color.push(Math.floor(Math.random() * 10));
    }
    return color.join("");
}

window.addEventListener("click", () => changeBackground(),);