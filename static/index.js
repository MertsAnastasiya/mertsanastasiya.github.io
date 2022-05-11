import { keyboardLines } from './allKeys.js'

const KEYBOARD = {
  elements: {
    textResult: null,
    keyboardWrapper: null,
    keys: [],
    emptyElements: ['Control', 'Alt', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Backspase', 'Shift', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight']
  },

  properties: {
    value: '',
    isCapsLock: false,
    isShift: false,
    pressedButton: new Set(),
    language: localStorage.getItem('selectedLanguage') || 'ru-Ru'
  },

  init () {
    //localStorage.setItem('selectedLanguage', this.properties.language)
    const body = document.querySelector('body')

    const main = document.createElement('main')

    const container = document.createElement('div')
    container.classList.add('container')

    const title = document.createElement('h1')
    title.innerHTML = 'Virtual Keyboards'
    title.classList.add('h1')

    this.elements.textResult = document.createElement('textarea')
    this.elements.textResult.classList.add('textarea')

    this.elements.keyboardWrapper = document.createElement('div')
    this.elements.keyboardWrapper.classList.add('keyboard-wrapper')

    this.createKey()

    container.appendChild(title)
    container.appendChild(this.elements.textResult)
    container.appendChild(this.elements.keyboardWrapper)

    main.appendChild(container)
    body.appendChild(main)
    this.elements.textResult.focus()
  },

  createKey () {
    for (const line in keyboardLines) {
      const keyboardLine = document.createElement('div')
      keyboardLine.classList.add('keyboard-line')
      keyboardLines[line].forEach(key => {
        const keyBtn = document.createElement('button')
        keyBtn.classList.add('key')
        keyBtn.setAttribute('id', key.id)
        switch (key.id) {
          case 'Space':
            keyBtn.classList.add('key-space-bar')
            keyBtn.innerHTML = ''
            break

          case 'Backspace':
            keyBtn.classList.add('key-backspace', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'Tab':
            keyBtn.classList.add('key-tab', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'ShiftLeft':
            keyBtn.classList.add('key-shift', 'key-wide')
            keyBtn.innerHTML = ''
            break
          case 'ShiftRight':
            keyBtn.classList.add('key-shift', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'CapsLock':
            keyBtn.classList.add('key-caps', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'Enter':
            keyBtn.classList.add('key-enter', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'ArrowLeft':
            keyBtn.classList.add('key-left')
            keyBtn.innerHTML = ''
            break
          case 'ArrowRight':
            keyBtn.classList.add('key-right')
            keyBtn.innerHTML = ''
            break
          case 'ArrowUp':
            keyBtn.classList.add('key-up')
            keyBtn.innerHTML = ''
            break
          case 'ArrowDown':
            keyBtn.classList.add('key-down')
            keyBtn.innerHTML = ''
            break
          case 'ControlLeft':
            keyBtn.classList.add('key-wide')
            if (localStorage.getItem('selectedLanguage').includes('ru')) {
              keyBtn.innerHTML = key.valueRu.toLowerCase()
            }
            if (this.properties.language.includes('en')) {
              keyBtn.innerHTML = key.valueEn.toLowerCase()
            }
            break
          case 'ControlRight':
            keyBtn.classList.add('key-wide')
            if (localStorage.getItem('selectedLanguage').includes('ru')) {
              keyBtn.innerHTML = key.valueRu.toLowerCase()
            }
            if (this.properties.language.includes('en')) {
              keyBtn.innerHTML = key.valueEn?.toLowerCase() || key.valueRu.toLowerCase()
            }
            break
          default:
            if (localStorage.getItem('selectedLanguage').includes('ru')) {
              keyBtn.innerHTML = key.valueRu.toLowerCase()
            }
            if (this.properties.language.includes('en')) {
              keyBtn.innerHTML = key.valueEn?.toLowerCase() || key.valueRu.toLowerCase()
            }
        }
        this.elements.keys.push(keyBtn)
        keyboardLine.appendChild(keyBtn)
      })
      this.elements.keyboardWrapper.appendChild(keyboardLine)
    }
  },

  changeLanguage (pressed, ...codes) {
    for (const code of codes) {
      if (!pressed.has(code)) {
        return
      }
    }
    if (this.properties.language.includes('ru')) {
      this.properties.language = 'en-EN'
      localStorage.setItem('selectedLanguage', this.properties.language)
      this.updateKeys()
    } else {
      this.properties.language = 'ru-Ru'
      localStorage.setItem('selectedLanguage', this.properties.language)
      this.updateKeys()
    }
    pressed.clear()
  },

  shiftUpdateKeys () {
    for (const line in keyboardLines) {
      keyboardLines[line].forEach(key => { // key из file
        this.elements.keys.forEach(item => {
          if (item.id === key.id && (item.id.includes('Digit') || item.id.includes('Minus') || item.id.includes('Equal') || item.id.includes('Quote') || item.id.includes('Semisolon') || item.id.includes('Slash'))) {
            item.innerHTML = key.valueShift
          } else {
            item.innerHTML = item.innerHTML.toUpperCase()
          }
        })
      })
    }
  },

  unshiftUpdateKeys () {
    for (const line in keyboardLines) {
      keyboardLines[line].forEach(key => {
        this.elements.keys.forEach(item => {
          if (item.id === key.id && (item.id.includes('Digit') || item.id.includes('Minus') || item.id.includes('Equal') || item.id.includes('Quote') || item.id.includes('Semisolon') || item.id.includes('Slash'))) {
            item.innerHTML = key.valueRu
          } else {
            item.innerHTML = item.innerHTML.toLowerCase()
          }
        })
      })
    }
  },

  updateKeys () {
    const keyboardWrapper = document.getElementsByClassName('keyboard-wrapper')[0]
    this.elements.keys.length = 0
    keyboardWrapper.innerHTML = ''

    for (const line in keyboardLines) {
      const keyboardLine = document.createElement('div')
      keyboardLine.classList.add('keyboard-line')
      keyboardLines[line].forEach(key => {
        const keyBtn = document.createElement('button')
        keyBtn.classList.add('key')
        keyBtn.setAttribute('id', key.id)
        switch (key.id) {
          case 'Space':
            keyBtn.classList.add('key-space-bar')
            keyBtn.innerHTML = ''
            break

          case 'Backspace':
            keyBtn.classList.add('key-backspace', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'Tab':
            keyBtn.classList.add('key-tab')
            keyBtn.innerHTML = ''
            break

          case 'ShiftLeft':
            keyBtn.classList.add('key-shift', 'key-wide')
            keyBtn.innerHTML = ''
            break
          case 'ShiftRight':
            keyBtn.classList.add('key-shift', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'CapsLock':
            keyBtn.classList.add('key-caps', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'Enter':
            keyBtn.classList.add('key-enter', 'key-wide')
            keyBtn.innerHTML = ''
            break

          case 'ArrowLeft':
            keyBtn.classList.add('key-left')
            keyBtn.innerHTML = ''
            break
          case 'ArrowRight':
            keyBtn.classList.add('key-right')
            keyBtn.innerHTML = ''
            break
          case 'ArrowUp':
            keyBtn.classList.add('key-up')
            keyBtn.innerHTML = ''
            break
          case 'ArrowDown':
            keyBtn.classList.add('key-down')
            keyBtn.innerHTML = ''
            break
          case 'ControlLeft':
            keyBtn.classList.add('key-wide')
            if (localStorage.getItem('selectedLanguage').includes('ru')) {
              keyBtn.innerHTML = key.valueRu.toLowerCase()
            }
            if (this.properties.language.includes('en')) {
              keyBtn.innerHTML = key.valueEn?.toLowerCase() || key.valueRu.toLowerCase()
            }
            break
          case 'ControlRight':
            keyBtn.classList.add('key-wide')
            if (localStorage.getItem('selectedLanguage').includes('ru')) {
              keyBtn.innerHTML = key.valueRu.toLowerCase()
            }
            if (this.properties.language.includes('en')) {
              keyBtn.innerHTML = key.valueEn?.toLowerCase() || key.valueRu.toLowerCase()
            }
            break
          case 'AltLeft':
            keyBtn.innerHTML = 'alt'
            break
          case 'AltRight':
            keyBtn.innerHTML = 'alt'
            break

          default:
            if (localStorage.getItem('selectedLanguage').includes('ru')) {
              if (this.properties.isShift) {
                keyBtn.innerHTML = key.valueShift?.toLowerCase() || key.valueRu.toLowerCase()
              } else {
                keyBtn.innerHTML = key.valueRu.toLowerCase()
              }
            }
            if (this.properties.language.includes('en')) {
              if (this.properties.isShift) {
                keyBtn.innerHTML = key.valueShift?.toLowerCase() || key.valueEn.toLowerCase()
              } else {
                keyBtn.innerHTML = key.valueEn?.toLowerCase() || key.valueRu?.toLowerCase()
              }
            }
        }
        this.elements.keys.push(keyBtn)
        keyboardLine.appendChild(keyBtn)
      })
      this.elements.keyboardWrapper.appendChild(keyboardLine)
    }

    this.addListeners()
  },

  addListeners () {
    for (const key of this.elements.keys) {
      key.addEventListener('click', (event) => {
        switch (key.id) {
          case 'Space':
            this.properties.value += ' '
            this.elements.textResult.value = this.properties.value
            break

          case 'Backspace':
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
            this.elements.textResult.value = this.properties.value
            break

          case 'Tab':
            this.properties.value += '  '
            this.elements.textResult.value = this.properties.value
            break

          case 'ShiftLeft':
            this.properties.isShift = !this.properties.isShift
            key.classList.toggle('key-active')
            if (key.classList.value.includes('key-active')) {
              this.shiftUpdateKeys();
            } else {
              this.unshiftUpdateKeys()
            }
            break
          case 'ShiftRight':
            this.properties.isShift = !this.properties.isShift
            key.classList.toggle('key-active')
            if (key.classList.value.includes('key-active')) {
              this.shiftUpdateKeys();
            } else {
              this.unshiftUpdateKeys()
            }
            break

          case 'CapsLock':
            key.classList.toggle('key-active')
            this.properties.isCapsLock = !this.properties.isCapsLock
            for (const item of this.elements.keys) {
              item.innerHTML = this.properties.isCapsLock ? item.innerHTML.toUpperCase() : item.innerHTML.toLowerCase()
            }
            break

          case 'Enter':
            this.properties.value += '\n'
            this.elements.textResult.value = this.properties.value
            break

          case 'ArrowLeft':
            this.properties.value += '←'
            this.elements.textResult.value = this.properties.value
            break

          case 'ArrowRight':
            this.properties.value += '→'
            this.elements.textResult.value = this.properties.value
            break
          case 'ArrowUp':
            this.properties.value += '↑'
            this.elements.textResult.value = this.properties.value
            break
          case 'ArrowDown':
            this.properties.value += '↓'
            this.elements.textResult.value = this.properties.value
            break

          default: {
            if (this.elements.emptyElements.includes(key.id)) {
              this.properties.value += ''
            } else {
              if (this.properties.isShift) {
                this.shiftUpdateKeys()
                this.properties.value += key.innerHTML// .toUpperCase();
                this.elements.textResult.value = this.properties.value // key.classList.remove('key-active')
                this.properties.isShift = !this.properties.isShift // item.innerHTML = item.innerHTML.toUpperCase();
                if (!this.properties.isCapsLock) {
                  this.unshiftUpdateKeys()
                }
              } else {
                if (event.shiftKey) {
                  this.shiftUpdateKeys()
                  this.properties.value += key.innerHTML
                } else {
                  this.properties.value += key.innerHTML
                }
              }
            }
            if (!event.shiftKey) {
              const shift = document.getElementsByClassName('key-shift')

              if (String(shift[0].classList).includes('key-active')) {
                shift[0].classList.remove('key-active')
              }
              if (String(shift[1].classList).includes('key-active')) {
                shift[1].classList.remove('key-active')
              }
            }
          }
        }
        this.elements.textResult.value = this.properties.value
      })

      key.addEventListener('focus', (event) => {
        event.preventDefault()
        if (event.relatedTarget) {
          event.relatedTarget.focus()
        } else {
          event.currentTarget.blur()
        }
      })
    };

    document.addEventListener('keydown', (event) => {
      event.stopImmediatePropagation()
      event.preventDefault()

      this.properties.pressedButton.add(event.code)

      for (const key of this.elements.keys) {
        if (key.id === event.code) {
          // this.properties.value += key.innerHTML;
          key.classList.add('push')
          if (key.id.includes('CapsLock')) {
            this.properties.isCapsLock = !this.properties.isCapsLock
            key.classList.toggle('key-active')
            for (const item of this.elements.keys) {
              item.innerHTML = this.properties.isCapsLock ? item.innerHTML.toUpperCase() : item.innerHTML.toLowerCase()
            }
            return
          }
          if (event.shiftKey) {
            this.shiftUpdateKeys()
            if (key.id.includes('Shift')) {
              key.classList.add('key-active')
              key.classList.add('push')
            }
          }

          if (key.id.includes('Space')) {
            this.properties.value += ' '
            break
          }

          if (key.id.includes('Tab')) {
            this.properties.value += '  '; break
          }

          if (key.id.includes('Enter')) {
            this.properties.value += '\n'; break
          }

          if (key.id.includes('Control')) {
            console.log('comcc')
            this.properties.value += ''; break
          }

          if (key.id.includes('Alt')) {
            this.properties.value += ''; break
          }

          if (key.id.includes('Backspace')) {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
            break
          }

          this.properties.value += key.innerHTML

          this.elements.textResult.value = this.properties.value
        }
        this.changeLanguage(this.properties.pressedButton, 'ControlLeft', 'AltLeft')// ????
      }
      this.elements.textResult.value = this.properties.value
    })

    document.addEventListener('keyup', (event) => {
      this.properties.pressedButton.delete(event.code)

      for (const key of this.elements.keys) {
        if (key.id === event.code) {
          if (key.id.includes('Shift')) {
            key.classList.remove('key-active')
            this.properties.isShift = false
            this.unshiftUpdateKeys()
          }
          key.classList.remove('push')
        }
      }
    })
  }

}

KEYBOARD.init()
KEYBOARD.addListeners()
