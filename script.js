//Char groups
const NOCAP_CHARS = 'abcdefghijklmnopqrstuvwxyz'
const CAP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBER_CHARS = '0123456789'
const SPECIAL_CHARS = '!@#$%&*/-+=' 

//Element selectors
const RES_INPUT = document.getElementById('password')
const SIZE_INPUT = document.getElementById('size')
const CHECKBOXES = document.querySelectorAll('input[type="checkbox"]')
const COPY = document.querySelector('img[alt="copiar"]')
const REFRESH = document.querySelector('img[alt="refresh"]')
const SECURITY = document.querySelector('div#security')
const SECURITY_STATE = document.querySelector('p#security-state')

//EventListeners
window.addEventListener('load', generatePassword)
SIZE_INPUT.addEventListener('input', generatePassword)
COPY.addEventListener('click', copyToClipboard)
REFRESH.addEventListener('click', generatePassword)
for(let i= 0; i<CHECKBOXES.length; i++){
    CHECKBOXES[i].addEventListener('click', generatePassword)
}

//Funções
function copyToClipboard(){
    navigator.clipboard.writeText(`${RES_INPUT.value}`)
}
function checkPasswordSecurity(password_size, char_length){
    if(password_size >= 15){
        if(char_length == 73){
            changeSecurity('green', '100%', 'Muito forte')
        }else if(char_length == 62 || char_length == 63 || char_length == 47 || char_length == 46){
            changeSecurity('yellowgreen', '80%', 'Forte')
        }else{
            changeSecurity('yellow', '60%', 'Média')
        }
    }else if(password_size >= 10){
        if(char_length == 73){
            changeSecurity('yellowgreen', '80%', 'Forte')
        }else if(char_length == 62 || char_length == 63 || char_length == 47 || char_length == 46){
            changeSecurity('yellow', '60%', 'Média')
        }else{
            changeSecurity('orange', '40%', 'Fraca')
        }
    }else{
        if(char_length == 73){
            changeSecurity('yellow', '60%', 'Média')
        }else if(char_length == 62 || char_length == 63 || char_length == 47 || char_length == 46){
            changeSecurity('orange', '40%', 'Fraca')
        }else{
            changeSecurity('red', '20%', 'Muito fraca')
        }
    }
}
function changeSecurity(color, width, text){
    SECURITY.style.width = `${width}`
    SECURITY.style.backgroundColor = `${color}`
    SECURITY_STATE.innerText = `${text}`
}
function generatePassword(){
    let [chars, chars_length] = getPossibleChars()
    let password = ''
    let password_size = Number(SIZE_INPUT.value)
    checkPasswordSecurity(password_size, chars_length)
    for(let i=0; i<password_size; i++){
        let chosen_char = Math.round(Math.random() * (chars_length - 1))
        password += chars[chosen_char]
    }
    RES_INPUT.value = `${password}`
}

function getPossibleChars(){
    let have_caps = CHECKBOXES[0].checked
    let have_num = CHECKBOXES[1].checked
    let have_special = CHECKBOXES[2].checked
    
    let possible_chars = NOCAP_CHARS
    if(have_caps){possible_chars += CAP_CHARS}
    if(have_special){possible_chars += SPECIAL_CHARS}
    if(have_num){possible_chars += NUMBER_CHARS}

    return [possible_chars, possible_chars.length]
}