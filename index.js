class Calculator {
  constructor(previousOperandTextElemet, currentOperandTextElemet) {
    this.previousOperandTextElemet = previousOperandTextElemet
    this.currentOperandTextElemet = currentOperandTextElemet
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = null
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  minus() {
    if (this.currentOperand !== '') {
      this.currentOperand = this.currentOperand * -1
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    this.compute()
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (Number.isNaN(prev) || Number.isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '/':
        computation = prev / current
        break
      case '*':
        computation = prev * current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = null
    this.previousOperand = ''
  }

  updateDisplay() {
    this.currentOperandTextElemet.innerText = this.currentOperand
    if (this.operation !== null) {
      this.previousOperandTextElemet.innerText = `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElemet.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const minusButton = document.querySelector('[data-minus]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandTextElemet = document.querySelector(
  '[data-previous-operand]'
)
const currentOperandTextElemet = document.querySelector(
  '[data-current-operand]'
)
const calculator = new Calculator(
  previousOperandTextElemet,
  currentOperandTextElemet
)

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

minusButton.addEventListener('click', () => {
  calculator.minus()
  calculator.updateDisplay()
})
