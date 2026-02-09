const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const button6 = document.getElementById("button6");
const button7 = document.getElementById("button7");
const button8 = document.getElementById("button8");
const button9 = document.getElementById("button9");
const button0 = document.getElementById("button0");
const button_decimal = document.getElementById("button_decimal");
const button_equals = document.getElementById("button_equals");
const button_add = document.getElementById("button_plus");
const button_subtract = document.getElementById("button_minus");
const button_multiply = document.getElementById("button_multiply");
const button_divide = document.getElementById("button_divide");
const button_clear = document.getElementById("buttonclear");

const display_screen = document.getElementById("display_screen");

let num1 = ""
let num2 = ""
let answer = ""

function button_press_1() {
    display_screen.innerText += "1";
};
function button_press_2() {
    display_screen.innerText += "2";
};
function button_press_3() {
    display_screen.innerText += "3";
};
function button_press_4() {
    display_screen.innerText += "4";
};
function button_press_5() {
    display_screen.innerText += "5";
};
function button_press_6() {
    display_screen.innerText += "6";
};
function button_press_7() {
    display_screen.innerText += "7";
};
function button_press_8() {
    display_screen.innerText += "8";
};
function button_press_9() {
    display_screen.innerText += "9";
};
function button_press_0() {
    display_screen.innerText += "0";
};
function button_press_decimal() {
    display_screen.innerText += ".";
};

function button_press_add() {
    add = true
    subtract = false
    multiply = false
    divide = false
    num1 = display_screen.innerText
    display_screen.innerText = ""
    button_add.style.backgroundColor = "#425d6d"
    button_subtract.style.backgroundColor = "#23323b"
    button_multiply.style.backgroundColor = "#23323b"
    button_divide.style.backgroundColor = "#23323b"
};
function button_press_subtract() {
    add = false
    subtract = true
    multiply = false
    divide = false
    num1 = display_screen.innerText
    display_screen.innerText = ""
    button_add.style.backgroundColor = "#23323b"
    button_subtract.style.backgroundColor = "#425d6d"
    button_multiply.style.backgroundColor = "#23323b"
    button_divide.style.backgroundColor = "#23323b"
};
function button_press_multiply() {
    add = false
    subtract = false
    multiply = true
    divide = false
    num1 = display_screen.innerText
    display_screen.innerText = ""
    button_add.style.backgroundColor = "#23323b"
    button_subtract.style.backgroundColor = "#23323b"
    button_multiply.style.backgroundColor = "#425d6d"
    button_divide.style.backgroundColor = "#23323b"
};
function button_press_divide() {
    add = false
    subtract = false
    multiply = false
    divide = true
    num1 = display_screen.innerText
    display_screen.innerText = ""
    button_add.style.backgroundColor = "#23323b"
    button_subtract.style.backgroundColor = "#23323b"
    button_multiply.style.backgroundColor = "#23323b"
    button_divide.style.backgroundColor = "#425d6d"
};

function button_press_clear() {
    display_screen.innerText = "";
    add = false
    subtract = false
    multiply = false
    divide = false
    button_add.style.backgroundColor = "#23323b"
    button_subtract.style.backgroundColor = "#23323b"
    button_multiply.style.backgroundColor = "#23323b"
    button_divide.style.backgroundColor = "#23323b"
    num1 = ""
    num2 = ""
};

function calculate() {
    num2 = display_screen.innerText;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    display_screen.innerText = ""

    if (add == true) {
        answer = num1 + num2
    }
    else if (subtract == true) {
        answer = num1 - num2
    }
    else if (multiply == true) {
        answer = num1 * num2
    }
    else if (divide == true) {
        answer = num1 / num2
    }

    display_screen.innerText = answer

    add = false
    subtract = false
    multiply = false
    divide = false
    button_add.style.backgroundColor = "#23323b"
    button_subtract.style.backgroundColor = "#23323b"
    button_multiply.style.backgroundColor = "#23323b"
    button_divide.style.backgroundColor = "#23323b"
    num1 = ""
    num2 = ""
        
};

button1.addEventListener("click",button_press_1)
button2.addEventListener("click",button_press_2)
button3.addEventListener("click",button_press_3)
button4.addEventListener("click",button_press_4)
button5.addEventListener("click",button_press_5)
button6.addEventListener("click",button_press_6)
button7.addEventListener("click",button_press_7)
button8.addEventListener("click",button_press_8)
button9.addEventListener("click",button_press_9)
button0.addEventListener("click",button_press_0)

button_clear.addEventListener("click",button_press_clear)

button_add.addEventListener("click",button_press_add)
button_subtract.addEventListener("click",button_press_subtract)
button_multiply.addEventListener("click",button_press_multiply)
button_divide.addEventListener("click",button_press_divide)

button_decimal.addEventListener("click",button_press_decimal)

button_equals.addEventListener("click",calculate)


// function button_hover_clear() {
//     button_clear.style.backgroundColor = "#425d6d"
// }
// function button_nothover_clear() {
//     button_clear.style.backgroundColor = "#23323b"
// }
// button_clear.addEventListener("mouseover", button_hover_clear)
// button_clear.addEventListener("mouseleave", button_nothover_clear)
    
// function button_hover_add() {
//     button_add.style.backgroundColor = "#425d6d"
// }
// function button_nothover_add() {
//     button_add.style.backgroundColor = "#23323b"
// }
// button_add.addEventListener("mouseover", button_hover_add)
// button_add.addEventListener("mouseleave", button_nothover_add)

// function button_hover_subtract() {
//     button_subtract.style.backgroundColor = "#425d6d"
// }
// function button_nothover_subtract() {
//     button_subtract.style.backgroundColor = "#23323b"
// }
// button_subtract.addEventListener("mouseover", button_hover_subtract)
// button_subtract.addEventListener("mouseleave", button_nothover_subtract)

// function button_hover_multiply() {
//     button_multiply.style.backgroundColor = "#425d6d"
// }
// function button_nothover_multiply() {
//     button_multiply.style.backgroundColor = "#23323b"
// }
// button_multiply.addEventListener("mouseover", button_hover_multiply)
// button_multiply.addEventListener("mouseleave", button_nothover_multiply)

// function button_hover_divide() {
//     button_divide.style.backgroundColor = "#425d6d"
// }
// function button_nothover_divide() {
//     button_divide.style.backgroundColor = "#23323b"
// }
// button_divide.addEventListener("mouseover", button_hover_divide)
// button_divide.addEventListener("mouseleave", button_nothover_divide)