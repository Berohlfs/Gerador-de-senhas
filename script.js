//Char groups
const NOCAP_CHARS = 'abcdefghijklmnopqrstuvwxyz'
const CAP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBER_CHARS = '123456789'
const SPECIAL_CHARS = '!@#$%&*/-+=' 

//Element selectors
const INPUTS = document.querySelectorAll('input')
const LABELS = document.querySelectorAll('label')
const BUTTON = document.querySelector('button')
const SIZE_TEXT = document.querySelector('p')
let res = document.querySelector('input#password')

//EventListeners
BUTTON.addEventListener('click', generatePassword)
for(let i=0; i<LABELS.length; i++){
    LABELS[i].addEventListener('click', ()=>{LABELS[i].classList.toggle('yellow')})
}
INPUTS[0].addEventListener('change', (e)=>{SIZE_TEXT.innerText = `Tamanho: ${e.target.value} letra(s)`})

//Funções
function generatePassword(){
    [chars, chars_length] = getPossibleChars()
    let password = ''
    let password_size = Number(INPUTS[0].value)
    for(let i=0; i<password_size; i++){
        let chosen_char = Math.round(Math.random() * chars_length)
        password += chars[chosen_char]
    }
    res.value = `${password}`
}

function getPossibleChars(){
    let have_caps = INPUTS[1].checked
    let have_special = INPUTS[2].checked
    let have_num = INPUTS[3].checked

    let possible_chars = NOCAP_CHARS
    if(have_caps){possible_chars += CAP_CHARS}
    if(have_special){possible_chars += SPECIAL_CHARS}
    if(have_num){possible_chars += NUMBER_CHARS}

    return [possible_chars, possible_chars.length - 1]
}