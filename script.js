const MAX_DISPLAY_LENGTH = 9;

const display = document.querySelector("#display");

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

function press_digit(id) {
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

function reset() {
    state = "typing number";
    operand_being_edited = "first";
    operands.first = "0";
    display.textContent = operands.first;
}

let operand_being_edited = "first";
let state = "typing number";

let operands = { first: "0", second: "0" };
let operation_str;

document.querySelectorAll(".digit").forEach( (node) => {
    node.addEventListener("click", (e) => {
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
        
        press_digit(e.target.id);
    });
});

document.querySelectorAll(".operation").forEach( (node) => {
    node.addEventListener("click", (e) => {
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
        operation_str = e.target.id;
    });
});

document.querySelectorAll("#equals").forEach( (node) => {
    node.addEventListener("click", (e) => {
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
    });``
});

// @Todo: change syntax to find one thing
document.querySelectorAll("#clear").forEach( (node) => {
    node.addEventListener("click", (e) => {
        reset();
    });
});


/*
// copy this to check for state:

switch (state) {
    case "typing number":
        if (operand_being_edited === "first") {

        }
        else if (operand_being_edited === "second") {

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
*/