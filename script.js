const MAX_DISPLAY_LENGTH = 9;

const display = document.querySelector("#display");

let operand_being_edited = "first";
let state = "typing number";

let operands = { first: "0", second: "0" };
let operation_str;

function reset() {
    state = "typing number";
    operand_being_edited = "first";
    operands.first = "0";
    display.textContent = operands.first;
}
document.querySelector("#clear").addEventListener("click", (e) => reset() );

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate() {
    const operations = { add, subtract, multiply, divide };
    const operation_func = operations[operation_str];
    console.assert(operation_func !== undefined);

    if (operation_func === divide && operands.second === "0") {
        reset();
        display.textContent = "/0? Fool!";

        return;
    }

    let result = operation_func( Number(operands.first), Number(operands.second) );
    
    let display_string = result.toString();
    if (display_string.length > MAX_DISPLAY_LENGTH && display_string.includes(".")) {
        const integer_length = Math.trunc(result).toString().length;
        const place_to_round = MAX_DISPLAY_LENGTH - integer_length - 1; // The -1 is to accommodate the decimal point.
        const rounded_result = Math.round(result * 10**place_to_round) / 10**place_to_round;
        display_string = rounded_result.toString();
    }
    // Note we allow the display to expand for *large* numbers, i.e. numbers with a lot of digits before any decimal point.
    // Handling large numbers would be a nice feature, but it's not part of the exercise.
    display.textContent = display_string;
    
    operands.first = display_string;
}

function append_digit(id) {
    let digit =
        id === "digit0"        ? "0" :
        id === "digit1"        ? "1" :
        id === "digit2"        ? "2" :
        id === "digit3"        ? "3" :
        id === "digit4"        ? "4" :
        id === "digit5"        ? "5" :
        id === "digit6"        ? "6" :
        id === "digit7"        ? "7" :
        id === "digit8"        ? "8" :
        id === "digit9"        ? "9" :
        id === "decimal-point" ? "." :
        null
    ;
    
    if (operands[operand_being_edited].length >= MAX_DISPLAY_LENGTH)
        return;
    if (digit === "." && operands[operand_being_edited].includes("."))
        return;
    if (operands[operand_being_edited] === "0")
        operands[operand_being_edited] = "";
    
    operands[operand_being_edited] += digit;
    
    if (operands[operand_being_edited] === ".")
        operands[operand_being_edited] = "0.";
    display.textContent = operands[operand_being_edited];
}

function press_digit(id) {
    switch (state) {
        case "typing number":
            if (operand_being_edited === "first") {
                ;
            }
            else if (operand_being_edited === "second") {
                ;
            }
            else console.assert(false);
            break;
        case "choosing operation":
            state = "typing number";
            operand_being_edited = "second";
            operands.second = "0";
            break;
        case "just operated":
            state = "typing number";
            operand_being_edited = "first";
            operands.first = "0";
            break;
        default:
            console.assert(false);
    }
    
    append_digit(id);
}
document.querySelectorAll(".digit").forEach( (node) => {
    node.addEventListener("click", (e) => press_digit(e.target.id) );
});

function press_operation(which) {
    switch (state) {
        case "typing number":
            if (operand_being_edited === "first") {
                ;
            }
            else if (operand_being_edited === "second") {
                operate();
            }
            else console.assert(false);
            break;
        case "choosing operation":
            break;
        case "just operated":
            break;
        default:
            console.assert(false);
    }

    state = "choosing operation";
    operation_str = which;
}
document.querySelectorAll(".operation").forEach( (node) => {
    node.addEventListener("click", (e) => press_operation(e.target.id) );
});

function press_equals() {
    switch (state) {
        case "typing number":
            if (operand_being_edited === "first") {
                ; // Do nothing.
            }
            else if (operand_being_edited === "second") {
                operate();
                state = "just operated";
            }
            else console.assert(false);
            break;
        case "choosing operation":
            // This behavior of defaulting the second number to the first is a replication of the online calculator (https://www.calculatorsoup.com/calculators/math/basic.php) linked in TOP's lesson
            operands.second = operands.first;
            operate();
            state = "just operated";
            break;
        case "just operated":
            operate();
            break;
        default:
            console.assert(false);
    }
}
document.querySelector("#equals").addEventListener("click", (e) => press_equals() );

function press_backspace() {
    console.log("press_backspace() called");
    if (state === "typing number") {
        console.log("deleting last letter...");
        operands[operand_being_edited] = operands[operand_being_edited].substring(0, operands[operand_being_edited].length - 1);
        if (operands[operand_being_edited] === "")
            operands[operand_being_edited] = "0";
        
        display.textContent = operands[operand_being_edited];
    }
}
document.querySelector("#backspace").addEventListener("click", (e) => press_backspace() );

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "/":
            press_operation("divide");
            break;
        case "*":
            press_operation("multiply");
            break;
        case "-":
            press_operation("subtract");
            break;
        case "+":
            press_operation("add");
            break;
        case "0":
            press_digit("digit0");
            break;
        case "1":
            press_digit("digit1");
            break;
        case "2":
            press_digit("digit2");
            break;
        case "3":
            press_digit("digit3");
            break;
        case "4":
            press_digit("digit4");
            break;
        case "5":
            press_digit("digit5");
            break;
        case "6":
            press_digit("digit6");
            break;
        case "7":
            press_digit("digit7");
            break;
        case "8":
            press_digit("digit8");
            break;
        case "9":
            press_digit("digit9");
            break;
        case ".":
            press_digit("decimal-point");
            break;
        case "Enter":
            press_equals();
            break;
        case "Delete":
            reset();
            break;
        case "Backspace":
            press_backspace();
            break;
    }
});
