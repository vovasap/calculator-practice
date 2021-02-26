let Calculator = {
    elements: {
        main: null,
        display: null,
        displayInner: null,
        keyboard: null
    },
    properties: {
        value: '0',
        calculatedExpression: ['0'],
        isNewOperation: true
    },

    init() {
        
        this.elements.displayInner = document.createElement('div')
        this.elements.displayInner.classList.add('calculator__display-inner')
        
        this.elements.display = document.createElement('div')
        this.elements.display.classList.add('calculator__display')
        this.elements.display.appendChild(this.elements.displayInner)

        this.elements.keyboard = document.createElement('div')
        this.elements.keyboard.classList.add('calculator__keyboard')
        this.elements.keyboard.appendChild(this._createKeyboard())

        this.elements.main = document.createElement('div')
        this.elements.main.classList.add('calculator')
        this.elements.main.appendChild(this.elements.display)
        this.elements.main.appendChild(this.elements.keyboard)

        document.body.appendChild(this.elements.main)

        this.elements.displayInner.textContent = this.properties.value
    },

    _createKeyboard() {
        const fragment = document.createDocumentFragment()
        
        const keys = [
            'C', 'CE', 'DEL', '/',
            '7', '8', '9', '*',
            '4', '5', '6', '-',
            '1', '2', '3', '+',
            '+/-', '0', '.', '='
        ]

        keys.forEach(key => {
            const keyElement = document.createElement('button')
            keyElement.classList.add('calculator__key')
            keyElement.innerHTML = key

            switch(key) {
                case 'C':
                    keyElement.style.color = '#ff5349'
                    keyElement.addEventListener('click', () => {
                        this.properties.calculatedExpression = ['']
                        this.elements.displayInner.textContent = '0'
                    })

                    break

                case 'CE':
                    keyElement.addEventListener('click', () => {
                        if (this.properties.calculatedExpression.length === 1 ) {
                            this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1] = '0'
                        } else {
                            this.properties.calculatedExpression.pop()
                        }

                        this._setValueOnDisplay()
                    })

                    break

                case 'DEL':
                    keyElement.addEventListener('click', () => {
                        if (this.properties.calculatedExpression.length === 1 &&
                            this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1].length === 1) {

                            this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1] = '0'

                        } else {
                            if (this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1] === '') {

                                this.properties.calculatedExpression.pop()
                                this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1] = 
                                    this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1].toString()

                            } 
                            this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1] = 
                                this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1]
                                .substring(0, this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1].length - 1)
                        }
                        
                        this._setValueOnDisplay()
                    })

                    break

                case '/':
                case '*':
                case '-':
                case '+':
                    keyElement.addEventListener('click', () => {

                        if (this.properties.isNewOperation) {
                            this.properties.isNewOperation = false
                        }

                        this._addDataInCalculatedExpression(key)
                        this._setValueOnDisplay()
                    })

                    break

                case '=':
                    keyElement.addEventListener('click', () => {
                        this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1] = 
                            parseFloat(this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1])

                        this.properties.calculatedExpression = [this._getResult(this.properties.calculatedExpression)]
                        this.properties.isNewOperation = true
                        this._setValueOnDisplay()
                    })

                    break

                case '+/-':
                    keyElement.addEventListener('click', () => {
                        if (this.properties.calculatedExpression.length % 2 === 1 ) {
                            if (this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1][0] !== '-') {

                                this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1] =
                                    `-${this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1]}`

                            } else {

                                this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1] =
                                    this.properties.calculatedExpression[this.properties.calculatedExpression.length - 1].slice(1)
                            }
                        }
                        this._setValueOnDisplay()
                    })

                    break
                    
                default:
                    keyElement.addEventListener('click', () => {
                        if (this.properties.isNewOperation) {
                            this.properties.value = ''
                            this.properties.calculatedExpression = ['']
                            this.properties.isNewOperation = false
                        }

                        this._addDataInCalculatedExpression(key)
                        this._setValueOnDisplay()
                    })

                    break

            }

            fragment.appendChild(keyElement)
        })
        
        return fragment
    },    

    _setValueOnDisplay() {
        this.elements.displayInner.textContent = this.properties.calculatedExpression.join('')
    },

    _addDataInCalculatedExpression(key) {
        let CalcExp = this.properties.calculatedExpression

        if (key === '.') {
            if (!/\./.test(CalcExp[CalcExp.length - 1])) {
                if (!isNaN(CalcExp[CalcExp.length - 1])) {
                    if (CalcExp[CalcExp.length - 1] === '') {
                        CalcExp[CalcExp.length - 1] = '0.'
                    } else {
                        CalcExp[CalcExp.length - 1] += key
                    }
                } else {
                    CalcExp[CalcExp.length] = '0.'
                }
            }
        } else if (!isNaN(key)) {
            if (!isNaN(CalcExp[CalcExp.length - 1])) {
                if (key === 0) {
                    if (CalcExp.length > 0) {
                        if (CalcExp[CalcExp.length - 1] !== 0) {
                            CalcExp[CalcExp.length - 1] += '0'
                        } else {
                            CalcExp[CalcExp.length - 1] = '0'
                        }
                    } 
                    else {
                        CalcExp[CalcExp.length - 1] = '0'
                        console.log('and ere');

                    }
                } else {
                    CalcExp[CalcExp.length - 1] += key
                }
            } else {
                CalcExp[CalcExp.length] = key
            }
            
        } else {
            if (!isNaN(CalcExp[CalcExp.length - 1])) {
                CalcExp[CalcExp.length - 1] = parseFloat(CalcExp[CalcExp.length - 1])
                CalcExp[CalcExp.length] = key
            } else {
                CalcExp[CalcExp.length - 1] = key
            }
        }
    },

    _getResult(caulculatedExpression) {
        let sum = caulculatedExpression[0]
        for (let i = 0; i < caulculatedExpression.length; i++) {
            if (isNaN(caulculatedExpression[i])) {
                switch(caulculatedExpression[i]) {
                        case '+':
                            sum = new Decimal(sum).plus(caulculatedExpression[i + 1])
                            break

                        case '-':
                            sum = new Decimal(sum).minus(caulculatedExpression[i + 1])
                            break

                        case '*':
                            sum = new Decimal(sum).mul(caulculatedExpression[i + 1])
                            break

                        case '/':
                            sum = new Decimal(sum).div(caulculatedExpression[i + 1])
                            break
                }
            }
        }
        return sum.toString()
    }
}

window.addEventListener('DOMContentLoaded', function() {
    Calculator.init()
})