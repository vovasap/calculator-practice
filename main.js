let Calculator = {
    elements: {
        main: null,
        display: null,
        displayInner: null,
        keyboard: null,
        value: ''
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
        
    },

    _createKeyboard() {
        const fragment = document.createDocumentFragment()
        
        const keys = [
            'CE', 'C', 'DEL', '/',
            '7', '8', '9', '*',
            '4', '5', '6', '-',
            '1', '2', '3', '+',
            '+/-', '0', '.', '='
        ]

        keys.forEach(key => {
            const keyElement = document.createElement('button')
            keyElement.classList.add('calculator__key')
            keyElement.innerHTML = key

            fragment.appendChild(keyElement)
        })
        
        return fragment
    }
}
    
window.addEventListener('DOMContentLoaded', function() {
    Calculator.init()
})