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
    if (b === 0) {
        // @DoLater: handle this robustly
        console.log("Tried to divide by zero.");
    }
    // @DoLater: consider how to handle fractional outputs
    return a / b;
}

function operate() {
    const operations = { add, subtract, multiply, divide };
    const operation_func = operations[operation_str];
    console.assert(operation_func !== undefined);

    let result = operation_func(operands.first, operands.second);
    display.textContent = result;
    operands.first = result;
}

function press_digit(id) {
    let digit =
        id === "digit0" ? 0 :
        id === "digit1" ? 1 :
        id === "digit2" ? 2 :
        id === "digit3" ? 3 :
        id === "digit4" ? 4 :
        id === "digit5" ? 5 :
        id === "digit6" ? 6 :
        id === "digit7" ? 7 :
        id === "digit8" ? 8 :
        id === "digit9" ? 9 :
        null;

    operands[operand_being_edited] = 10 * operands[operand_being_edited] + digit;
    display.textContent = operands[operand_being_edited];
}

function reset() {
    state = "typing number";
    operand_being_edited = "first";
    operands.first = 0;
    display.textContent = operands.first;
}

let operand_being_edited = "first";
let state = "typing number";

let operands = { first: 0, second: 0 };
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
                operands.second = 0;
                break;
            case "just pressed equals":
                state = "typing number";
                operand_being_edited = "first";
                operands.first = 0;
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
            case "just pressed equals":
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
                    ;
                }
                else if (operand_being_edited === "second") {
                    operate();
                }
                else console.assert(false);
                break;
            case "choosing operation":
                operands.second = operands.first;
                operate();
                break;
            case "just pressed equals":
                operate();
                break;
            default:
                console.assert(false);
        }
        
        state = "just pressed equals";
    });
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
    case "just pressed equals":
        break;
    default:
        console.assert(false);
}
*/