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

   addListeners() {
    for(let key of this.elements.keys) {
        key.addEventListener('click', (event) => {
            switch(key.id) {
             case 'Space': 
                 this.properties.value += ' ';
                 this.elements.textResult.value = this.properties.value;
                 break;

             case 'Backspace':
                 this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                 this.elements.textResult.value = this.properties.value;
                 break;

             case 'Tab': 
                 this.properties.value += '  ';
                 this.elements.textResult.value = this.properties.value;
                 break;
                 
             case 'ShiftLeft': 
                 this.properties.shift = !this.properties.shift;
                 key.classList.toggle('key-active');
                 for(let item of this.elements.keys) {
                     if(key.classList.value.includes('key-active')) {
                         item.innerHTML = item.innerHTML.toUpperCase();
                     } else {
                         item.innerHTML = item.innerHTML.toLowerCase();
                     }
                 }
                 break;
             case 'ShiftRight': 
                 this.properties.shift = !this.properties.shift;
                 key.classList.toggle('key-active');
                 for(let item of this.elements.keys) {
                     if(key.classList.value.includes('key-active')) {
                         item.innerHTML = item.innerHTML.toUpperCase();
                     } else {
                         item.innerHTML = item.innerHTML.toLowerCase();
                     }
                 }
                 break;

             case 'CapsLock': 
                 key.classList.toggle('key-active');   
                 this.properties.caps = !this.properties.caps;
                 for(let item of this.elements.keys) {
                     if( item.innerHTML !== 'ctrl' || item.innerHTML !== 'alt' || item.innerHTML != 'delete') {
                         item.innerHTML = this.properties.caps ? item.innerHTML.toUpperCase() : item.innerHTML.toLowerCase();
                     }
                 }
                 break;

             case 'Enter': 
                 this.properties.value += '\n';
                 this.elements.textResult.value = this.properties.value;
                 break;

             case 'ArrowLeft':
                 this.properties.value += '←';
                 this.elements.textResult.value = this.properties.value;
                  break;

             case 'ArrowRight':
                 this.properties.value += '→';
                 this.elements.textResult.value = this.properties.value;
                 break;
             case 'ArrowUp':
                 this.properties.value += '↑';
                 this.elements.textResult.value = this.properties.value;
                 break;
             case 'ArrowDown': 
                 this.properties.value += '↓';
                 this.elements.textResult.value = this.properties.value;
                 break;
             default: {
                 this.properties.value += (this.properties.caps || this.properties.shift) ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase();
                 if(!event.shiftKey && this.properties.shift) {
                     this.properties.shift = false;
                     for(let item of this.elements.keys) {
                         item.innerHTML = this.properties.caps ? item.innerHTML.toUpperCase() : item.innerHTML.toLowerCase();
                     }
                 }

                 const shift = document.getElementsByClassName('key-shift');

                 if(String(shift[0].classList).includes('key-active')) {
                     shift[0].classList.remove('key-active');
                 }
                 if(String(shift[1].classList).includes('key-active')) {
                     shift[1].classList.remove('key-active');
                 }
                 
                 this.elements.textResult.value = this.properties.value; 
             }
             }
         });

         key.addEventListener('focus', (event) => {
             event.preventDefault();
             if(event.relatedTarget) {
                 event.relatedTarget.focus();
             }
             else {
                 event.currentTarget.blur();
             }
     });
    }
    
    document.addEventListener('keydown', (event) => {
        this.properties.pressedButton.add(event.code);
        for(let key of this.elements.keys) { 
             if(key.id == event.code) {
                 if(key.id == 'CapsLock') {
                     this.properties.caps = !this.properties.caps;
                     key.classList.toggle('key-active');
                     for(let item of this.elements.keys) {
                         item.innerHTML = this.properties.caps ? item.innerHTML.toUpperCase() : item.innerHTML.toLowerCase();
                     }
                     return;
                 }
                 if(event.shiftKey){
                     key.classList.add('key-active');
                     this.properties.shift = true;
                     for(let item of this.elements.keys) {
                         item.innerHTML = item.innerHTML.toUpperCase();
                     }
                     key.classList.add('push');
                     return;
                 }
                 key.classList.add('push');
             }
         }
         if( this.elements.emptyElements.includes(event.key)) {
             this.properties.value += ''; 
         } else {
             this.properties.value += event.key; 
         }
        
     });
 
     document.addEventListener('keyup', (event) => {
     this.properties.pressedButton.delete(event.code);
     for(let key of this.elements.keys) {
         if(key.id == event.code) { 
             if(key.id === 'ShiftLeft' || key.id === 'ShiftRight') {
                 key.classList.remove('key-active');
                 this.properties.shift = false;
                 for(let item of this.elements.keys) {
                     item.innerHTML = item.innerHTML.toLowerCase();
                 }
                 key.classList.remove('push');
                 return;
             }
             key.classList.remove('push');
         }
     }
 });
},
}
