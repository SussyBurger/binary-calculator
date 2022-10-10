class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0,-1)
    }

    appendNumber(number) {
        // Allow only 1 "." character
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculating()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let calculating
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
            calculating = prev + curr
            break;
            case '-':
                calculating = prev - curr
                break;
            case '×':
                calculating = prev * curr
            break;
            case '÷':
                calculating = prev / curr
            break;
            default:
            return
        }
        this.currentOperand = calculating
        this.operation = ''
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.previousOperand} ${this.operation}`

        }
    }
}
const numbBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const clearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator (previousOperandTextElement,
    currentOperandTextElement)

numbBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsBtn.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay()
})

clearBtn.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay()
})