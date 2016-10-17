"use strict";


// "Constructor" function
function Calculator(bodyElement, displayElement) {


    // TODO Define the body of the calculator

    this._body = bodyElement;
    this._display = displayElement;


    // TODO Render display

    this._render = function() {

        // Decrease the font size for long outputs
        if (this._currentValue.length <= 8) {
            this._display.style.fontSize = "45px";
        }
        if (this._currentValue.length > 8) {
            this._display.style.fontSize = "40px";
        }
        if (this._currentValue.length > 9) {
            this._display.style.fontSize = "35px";
        }
        if (this._currentValue.length > 10) {
            this._display.style.fontSize = "30px";
        }
        if (this._currentValue.length > 11) {
            this._display.style.fontSize = "25px";
        }

        this._display.innerText = this._currentValue;

    }.bind(this);


    // TODO Set initial values of operands and operator, use this method for AC button

    this.allClear = function() {
        this._currentValue = "0";
        this._rememberedValue = null;
        this._operator = null;

        this._render();

        console.log("Inputs were reset: \n" + "_currentValue: " + this._currentValue + "\n" + "_rememberedValue: " + this._rememberedValue + "\n" + "_operator: " + this._operator);
    }.bind(this);

    this.allClear();


    // TODO Get any button by the value of its value attribute

    this.getButton = function(value) {
        return this._body.querySelector("[value='" + value + "']");
    };


    // TODO Set current value

    this.setCurrentValue = function(event) {

        if (this._currentValue === "0") {
            this._currentValue = event.target.value;
        } else {
            this._currentValue += event.target.value;
        }

        this._render();

    }.bind(this);


    // TODO Add decimal sign

    this.addDecimal = function() {
        if (this._currentValue.indexOf(".") === -1) {
            this._currentValue += ".";
        }
        this._render();
    }.bind(this);


    // TODO Set the value of the operator

    this.setOperator = function(event) {
        this._operator = event.target.value;
        console.log(this._operator);
    }.bind(this);


    // TODO Do math

    this.doMath = function() {
        if (this._rememberedValue !== null && this._operator !== null) { // Do math only if operator and second operand are defined
            switch (this._operator) {
                case "/":
                    return this._currentValue / this._rememberedValue;
                    break;
                case "*":
                    return this._currentValue * this._rememberedValue;
                    break;
                case "-":
                    return this._currentValue - this._rememberedValue;
                    break;
                case "+":
                    return this._currentValue + this._rememberedValue;
                    break;
                default:
                    throw new Error("Something went wrong...");
                    return NaN;
            }
        } else {
            throw new Error("Operator or operands are not defined")
        }

    }
}


// TODO Bind buttons to appropriate methods

var calculator = new Calculator(document.querySelector(".calculator"), document.querySelector(".calculator__display"));

calculator.getButton("AC").addEventListener("click", calculator.allClear);

calculator.getButton("/").addEventListener("click", calculator.setOperator);
calculator.getButton("*").addEventListener("click", calculator.setOperator);
calculator.getButton("-").addEventListener("click", calculator.setOperator);
calculator.getButton("+").addEventListener("click", calculator.setOperator);

calculator.getButton("0").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("1").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("2").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("3").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("4").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("5").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("6").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("7").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("8").addEventListener("click", calculator.setCurrentValue);
calculator.getButton("9").addEventListener("click", calculator.setCurrentValue);
calculator.getButton(".").addEventListener("click", calculator.addDecimal);

