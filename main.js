let Calculator = {
    elements: {
        main: null,
        display: null,
        displayInner: null,
        keyboard: null
    },
    properties: {
        value: '0',
        firstOperand: 0,
        secondOperand: 0,
        operator: '',
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
                        this.properties.value = ''
                        this.properties.firstOperand = '0'
                        this.properties.secondOperand = ''
                        this._setValueOnDisplay()
                    })

                    break

                case 'CE':
                    keyElement.addEventListener('click', () => {

                    })

                    break

                case 'DEL':
                    keyElement.addEventListener('click', () => {

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
                        this.properties.firstOperand = this.properties.value
                        this.properties.value += key
                        this._setValueOnDisplay()
                    })

                    break

                case '=':
                    keyElement.addEventListener('click', () => {
                        this.properties.firstOperand = this.properties.firstOperand.toString()
                        if (!this.properties.isNewOperation) {
                            this.properties.operator = this.properties.value.substring(this.properties.firstOperand.length, this.properties.firstOperand.length + 1)
                            this.properties.secondOperand = this.properties.value.substring(this.properties.firstOperand.length + 1, this.properties.value.length) ? 
                                                        this.properties.value.substring(this.properties.firstOperand.length + 1, this.properties.value.length) :
                                                        this.properties.firstOperand
                        }
                        switch(this.properties.operator) {
                            case '+':
                                this.properties.value = (new Decimal(parseFloat(this.properties.firstOperand))).plus(parseFloat(this.properties.secondOperand))
                                this._setValueOnDisplay()

                                break

                            case '-':
                                this.properties.value = (new Decimal(parseFloat(this.properties.firstOperand))).minus(parseFloat(this.properties.secondOperand))
                                this._setValueOnDisplay()

                                break

                            case '*':
                                this.properties.value = (new Decimal(parseFloat(this.properties.firstOperand))).mul(parseFloat(this.properties.secondOperand))
                                this._setValueOnDisplay()

                                break

                            case '/':
                                this.properties.value = (new Decimal(parseFloat(this.properties.firstOperand))).div(parseFloat(this.properties.secondOperand))
                                this._setValueOnDisplay()

                                break
                        }
                        this.properties.firstOperand = this.properties.value
                        this.properties.isNewOperation = true
                    })

                    break

                case '+/-':
                    keyElement.addEventListener('click', () => {

                    })

                    break
                    
                default:
                    keyElement.addEventListener('click', () => {
                        if (this.properties.isNewOperation) {
                            this.properties.value = ''
                            this.properties.isNewOperation = false
                        }
                        this.properties.value += key
                        this._setValueOnDisplay()
                    })

                    break

            }

            fragment.appendChild(keyElement)
        })
        
        return fragment
    },    

    _setValueOnDisplay() {
        this.elements.displayInner.textContent = this.properties.value
    }
}

window.addEventListener('DOMContentLoaded', function() {
    Calculator.init()
})