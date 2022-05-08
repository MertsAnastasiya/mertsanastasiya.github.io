const KEYBOARD = {
    elements: {
        textResult: null,
        keyboardWrapper: null,
        keys: [],
    },

    properties: {
        value: '',
        caps: false,
        shift: false,
        pressedButton: new Set(),
        language: 'en-EN',
    },

    init() {
        const body = document.querySelector('body');

        const main = document.createElement('main');

        const container = document.createElement('div');
        container.classList.add('container');

        const title = document.createElement('h1');
        title.innerHTML = 'Virtual Keyboards';
        title.classList.add('h1');

        this.elements.textResult = document.createElement('textarea');
        this.elements.textResult.classList.add('textarea');

        this.elements.keyboardWrapper = document.createElement('div');
        this.elements.keyboardWrapper.classList.add('keyboard-wrapper');

        container.appendChild(title);
        container.appendChild(this.elements.textResult);
        container.appendChild(this.elements.keyboardWrapper);

        main.appendChild(container);
        body.appendChild(main);
        this.elements.textResult.focus();
    },
}