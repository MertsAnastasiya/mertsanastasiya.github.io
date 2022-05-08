import { keyboardLines } from './keys.js';

const KEYBOARD = {
    elements: {
        textResult: null,
        keyboardWrapper: null,
        keys: [],
        emptyElements: ['Control', 'Alt', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Backspase', 'Shift']
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

        this.createKey();

        container.appendChild(title);
        container.appendChild(this.elements.textResult);
        container.appendChild(this.elements.keyboardWrapper);

        main.appendChild(container);
        body.appendChild(main);
        this.elements.textResult.focus();
    },

    createKey() {
        for(let line in keyboardLines) {
            const keyboardLine =  document.createElement('div');
            keyboardLine.classList.add('keyboard-line');
            keyboardLines[line].forEach(key => {
                const keyBtn = document.createElement('button');
                keyBtn.classList.add('key');
                keyBtn.setAttribute('id', key.id);  
                if(this.properties.language.includes('ru')) {
                    keyBtn.setAttribute('name', key.name.ru?.toLowerCase() || key.name.general?.toLowerCase());
                }
                if(this.properties.language.includes('en')) {
                    keyBtn.setAttribute('name', key.name.en?.toLowerCase() || key.name.general?.toLowerCase());
                }
                switch(key.id) {
                    case 'Space': 
                        keyBtn.classList.add('key-space-bar');  
                        keyBtn.innerHTML = '';
                        break;

                    case 'Backspace': 
                        keyBtn.classList.add('key-backspace', 'key-wide'); 
                        keyBtn.innerHTML = '';
                        break;

                    case 'Tab': 
                        keyBtn.classList.add('key-tab'); 
                        keyBtn.innerHTML = '';
                        break;
                        
                    case 'ShiftLeft': 
                        keyBtn.classList.add('key-shift', 'key-wide');    
                        keyBtn.innerHTML = '';
                        break;
                    case 'ShiftRight': 
                        keyBtn.classList.add('key-shift', 'key-wide');    
                        keyBtn.innerHTML = '';
                        break;

                    case 'CapsLock': 
                        keyBtn.classList.add('key-caps', 'key-wide'); 
                        keyBtn.innerHTML = '';
                        break;

                    case 'Enter': 
                        keyBtn.classList.add('key-enter', 'key-wide');     
                        keyBtn.innerHTML = '';
                        break;

                    case 'ArrowLeft': 
                        keyBtn.classList.add('key-left');   
                        keyBtn.innerHTML = '';
                        break;
                    case 'ArrowRight': 
                        keyBtn.classList.add('key-right');  
                        keyBtn.innerHTML = '';
                        break;
                    case 'ArrowUp': 
                        keyBtn.classList.add('key-up');  
                        keyBtn.innerHTML = '';
                        break;
                    case 'ArrowDown': 
                        keyBtn.classList.add('key-down');   
                        keyBtn.innerHTML = '';
                        break;

                    default: 
                        if(this.properties.language.includes('ru')) {
                            keyBtn.innerHTML = key.name.ru?.toLowerCase() || key.name.general?.toLowerCase();
                        }
                        if(this.properties.language.includes('en')) {
                            keyBtn.innerHTML = key.name.en?.toLowerCase() || key.name.general?.toLowerCase();
                        }
                }

                this.elements.keys.push(keyBtn);
                keyboardLine.appendChild(keyBtn);
            });
            this.elements.keyboardWrapper.appendChild(keyboardLine);
        }
   },
}
