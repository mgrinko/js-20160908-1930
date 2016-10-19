"use strict";

function Calculator(bodyElement, displayElement) {

    // TODO Define the body of the calculator:
    this._body = bodyElement;
    this._display = displayElement;

    this.getButton = function(value) {
        return this._body.querySelector("[value='" + value + "']");
    };  // TODO Get any button by the value of its value attribute

    this._render = function() {

        if (this._currentValue === "0" && this._operator === null) {
            this.getButton("AC").innerText = "AC";
        } else {
            this.getButton("AC").innerText = "C";
        }

        switch (this._currentValue.length) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                this._display.style.fontSize = "45px";
                break;
            case 9:
                this._display.style.fontSize = "40px";
                break;
            case 10:
                this._display.style.fontSize = "35px";
                break;
            case 11:
                this._display.style.fontSize = "30px";
                break;
            case 12:
                this._display.style.fontSize = "25px";
                break;
            default:
                this._display.style.fontSize = "20px";
        } // Decrease the font size for long outputs

        if (this._result) {
            this._display.innerText = this._result;
        } else {
            this._display.innerText = this._currentValue;
        }

        (function() {
            console.log("_current: " + this._currentValue + "\n_remembered: " + this._rememberedValue + "\n_operator: " + this._operator + "\n_result: " + this._result);
        }.bind(this))(); // Test function

    }.bind(this);   // TODO Render display

    this.clear = function() {

        if (this._rememberedValue && this._currentValue !== "0" && this._operator) {
            this._currentValue = "0";
        } else if (this._rememberedValue && this._currentValue === "0" && this._operator) {
            this._operator = null;
        } else if (this._currentValue !== "0" && this._operator) {
            this._operator = null;
        } else {
            this._currentValue = "0";
            this._operator = null;
            this._rememberedValue = null;

            this._result = null;
        }

        this._render();

    }.bind(this);   // TODO Set initial values of operands and operator, also use this method for AC button
    this.clear();   // TODO Set initial values

    this.setCurrentValue = function(event) {
        if (event.target.value === ".") {
            if (this._currentValue && this._operator && this._rememberedValue && this._result) {
                this._rememberedValue = this._result;
                this._result = null;
                this._currentValue = "0.";
            } else if (!this._operator) {
                if (this._currentValue.indexOf(".") === -1) {
                    this._currentValue += ".";
                }
            } else {
                if (!this._rememberedValue) {
                    this._rememberedValue = this._currentValue;
                    this._currentValue = "0.";
                } else {
                    if (this._currentValue.indexOf(".") === -1) {
                        this._currentValue += ".";
                    }
                }
            }
        } else if (this._currentValue && this._operator && this._rememberedValue && this._result) {
            this._rememberedValue = this._result;
            this._result = null;
            this._currentValue = event.target.value;
        } else if (this._operator === null) {
            if (this._currentValue === "0") {
                this._currentValue = event.target.value;
            } else {
                this._currentValue += event.target.value;
            }
        } else if (this._rememberedValue === null) {
            this._rememberedValue = this._currentValue;
            this._currentValue = event.target.value;
        } else {
            if (this._currentValue === "0") {
                this._currentValue = event.target.value;
            } else {
                this._currentValue += event.target.value;
            }
        }
        this._render();
    }.bind(this);   // TODO Set current value

    // this.addDecimal = function() {
    //     if (!this._operator) {
    //         if (this._currentValue.indexOf(".") === -1) {
    //             this._currentValue += ".";
    //         }
    //     } else {
    //         if (!this._rememberedValue) {
    //             this._rememberedValue = this._currentValue;
    //             this._currentValue = "0.";
    //         } else {
    //             if (this._currentValue.indexOf(".") === -1) {
    //                 this._currentValue += ".";
    //             }
    //         }
    //     }
    //     this._render();
    // }.bind(this);   // TODO Add decimal sign

    this.changeSign = function() {
        if (!this._operator) {
            if (this._currentValue.indexOf("-") === -1) {
                this._currentValue = "-" + this._currentValue;
            } else {
                this._currentValue = this._currentValue.slice(1);
            }
        } else {
            this._rememberedValue = this._currentValue;
            if (this._currentValue.indexOf("-") === -1) {
                this._currentValue = "-" + this._currentValue;
            } else {
                this._currentValue = this._currentValue.slice(1);
            }
        }

        this._render();

    }.bind(this);   // TODO Change sign of the current value

    this.setOperator = function(event) {
        if (this._currentValue && this._operator && this._rememberedValue && this._result) {
            this._currentValue = this._result;

            this._rememberedValue = null;
            this._result = null;
        } else if (this._currentValue && this._operator && this._rememberedValue) {
            this.doMath();
        }

        this._operator = event.target.value;

        this._render();
    }.bind(this);   // TODO Set the value of the operator

    this.doMath = function() {

        var o1 = parseFloat(this._rememberedValue);
        var o2 = parseFloat(this._currentValue);

        if (this._operator && this._rememberedValue) {
            switch (this._operator) {
                case "/":
                    this._result = (o1 / o2).toString(10);
                    break;
                case "*":
                    this._result = (o1 * o2).toString(10);
                    break;
                case "-":
                    this._result = (o1 - o2).toString(10);
                    break;
                case "+":
                    this._result = (o1 + o2).toString(10);
                    break;
            }
        } else if (this._operator) {
            switch (this._operator) {
                case "/":
                    this._result = (o2 / o2).toString(10);
                    break;
                case "*":
                    this._result = (o2 * o2).toString(10);
                    break;
                case "-":
                    this._result = (o2 - o2).toString(10);
                    break;
                case "+":
                    this._result = (o2 + o2).toString(10);
                    break;
            }
        }

        this._rememberedValue = this._result;
        this._render();
    }.bind(this);   // TODO Do math

    this.doPercentage = function() {
        var o1 = parseFloat(this._rememberedValue);
        var o2 = parseFloat(this._currentValue);

        if (this._currentValue && this._operator && this._rememberedValue) {
            this._currentValue = (o1 * (o2 / 100)).toString(10);
        } else if (this._currentValue && this._operator) {

            this._rememberedValue = this._currentValue;
            this._currentValue = (o2 / 100).toString(10);

            this.doMath();

        } else {
            this._currentValue = (o2 / 100).toString(10);
        }
        this._render();
    }.bind(this);
}

{
    var calculator = new Calculator(document.querySelector(".calculator"), document.querySelector(".calculator__display"));

    calculator.getButton("AC").addEventListener("click", calculator.clear);
    calculator.getButton("+/-").addEventListener("click", calculator.changeSign);
    calculator.getButton("%").addEventListener("click", calculator.doPercentage);

    calculator.getButton("/").addEventListener("click", calculator.setOperator);
    calculator.getButton("*").addEventListener("click", calculator.setOperator);
    calculator.getButton("-").addEventListener("click", calculator.setOperator);
    calculator.getButton("+").addEventListener("click", calculator.setOperator);

    calculator.getButton("=").addEventListener("click", calculator.doMath);

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
    calculator.getButton(".").addEventListener("click", calculator.setCurrentValue);

} // TODO Bind buttons to appropriate methods