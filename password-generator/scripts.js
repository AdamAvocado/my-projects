let resultElement = document.querySelector('.result');
let clipboardElement = document.querySelector('.result-container button');
let lengthElement = document.querySelector('.length');
let uppercaseElement = document.querySelector('.uppercase');
let lowercaseElement = document.querySelector('.lowercase');
let numbersElement = document.querySelector('.numbers');
let symbolsElement = document.querySelector('.symbols');
let generateElement = document.querySelector('.generate');

let randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    numbers: getRandomNumber,
    symbols: getRandomSymbol,
}

clipboardElement.addEventListener('click', () => {
    let password = resultElement.innerHTML;

    if (!password) {
        return;
    }
    
    window.navigator.clipboard.writeText(password);
    resultElement.innerHTML = 'Copied to clipboard!';

    setTimeout( () => {
        return resultElement.innerHTML = password;
    }, 2000);

})

generateElement.addEventListener('click', () => {
    let passwordLength = +lengthElement.value;
    let hasUpper = uppercaseElement.checked;
    let hasLower = lowercaseElement.checked;
    let hasNumbers = numbersElement.checked;
    let hasSymbols = symbolsElement.checked;

    resultElement.innerText = generatePassword(passwordLength, hasUpper, hasLower, hasNumbers, hasSymbols);

})

function generatePassword(passwordLength, upper, lower, numbers, symbols) {
    let generatedPassword = '';
    let typesCount = upper + lower + numbers + symbols;
    let typesArray = [{upper}, {lower}, {numbers}, {symbols}].filter(item => Object.values(item)[0])
    
    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < passwordLength; i+=typesCount) {
        typesArray.forEach(element => {
            let funcName = Object.keys(element)[0];
            generatedPassword += randomFunc[funcName]();
        })        
    }

    let finalPassword = generatedPassword.slice(0, passwordLength);
    return finalPassword;
}

//   function that returns random uppercase letter:
function getRandomUpper() {
    let randomChar = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(randomChar);
}

//   function that returns random lowercase letter:
function getRandomLower() {
    let randomChar = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(randomChar);
}

//   function that returns random number:
function getRandomNumber() {
    let randomChar = Math.floor(Math.random() * 10) + 48;
    return String.fromCharCode(randomChar);
}

//   function that returns random symbol:
function getRandomSymbol() {
    const SYMBOLS = '!@#$%^&*(){}[]=<>/,.';
    let randomChar = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    return randomChar;
}

/*
    readme

    Password-generator function:
    1. declares a generatedPassword variable as an empty string;
    2. counts boolean values of checkbox-settings as numbers;
    3. makes an array of {settings} to keep keys and values (e.g. [{upper: true}])
    4. filters false settings (removes them);
    5. if (2.) gets 0, returns empty string;
    for-loop :
        1. gets [0]keys of each {setting} of typesArray as a string;
        2. puts this string in randomFunc[here] to execute a function
        3. makes it as much as settings are checked;
    6. slices the generatedPassword to passwordLength
    7. returns finalPassword

    Принцип работы генератора паролей:
    1. объявляет переменную generatedPassword как пустую строку;
    2. складывает булевые значения отмеченных настроек как числа;
    3. собирает {настройки} в массив, чтобы сохранять ключи и значения каждой настройки;
    4. фильтрует ложные значения (удаляет)
    5. если (2.) равен 0, вся функция возвращает пустую строку;
    цикл for :
        1. берет [0]ключи каждой {настройки} массива как строки;
        2. подставляет эти строки в свойства объекта randomFunc[сюда], чтобы выполнить соответствующую функцию;
        3. отправляет столько свойств в функцию соответственно отмеченным настройкам;
    6. отбрасывает лишнее у получившихся символов ровно до нужной длины пароля;
    7. вся функция возвращает итоговый пароль;
*/