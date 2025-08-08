let calculationString = '';
let alreadyPointed = false;
let newString = true;

document.querySelector('.js-display').innerText = calculationString || 0;

function calculate(inputSrting) {
  document.querySelector('.js-error').classList.remove('error-active');

  if (inputSrting === '=') {
    if (calculationString[calculationString.length - 2] === '+' ||
      calculationString[calculationString.length - 2] === '-' ||
      calculationString[calculationString.length - 2] === '*' ||
      calculationString[calculationString.length - 2] === '/') {
      document.querySelector('.js-error').classList.add('error-active');
    } else {
      console.log(eval(calculationString));
      calculationString = eval(calculationString) || '';
      newString = true;
    }
  } else if (inputSrting === 'clear') {
    calculationString = '';
  } else {
    if (newString) {
      calculationString = '';
      newString = false;
    }
    if (inputSrting === '.') {
      if (!alreadyPointed) {
        if (calculationString[calculationString.length - 1] === ' ' ||
          calculationString[calculationString.length - 1] === undefined)
          calculationString += '0' + inputSrting;
        else
          calculationString += inputSrting;

        alreadyPointed = true;
      }
    } else if (inputSrting === ' + ' ||
      inputSrting === ' - ' ||
      inputSrting === ' * ' ||
      inputSrting === ' / ') {
      if (calculationString === '')
        calculationString += 0 + inputSrting;
      else
        calculationString += inputSrting;
    } else
      calculationString += inputSrting;
  }

  if (inputSrting === ' + ' ||
    inputSrting === ' - ' ||
    inputSrting === ' * ' ||
    inputSrting === ' / ' ||
    inputSrting === '=' ||
    inputSrting === 'clear')
    alreadyPointed = false;

  document.querySelector('.js-display').innerText = calculationString || 0;
}

function keyboardCalculate(event) {
  if (event.key === 'Enter')
    calculate('=');
  else if (event.key === 'Delete')
    calculate('clear');
  else if (event.key === '+' ||
    event.key === '-' ||
    event.key === '*' ||
    event.key === '/')
    calculate(` ${event.key} `);
  else if (typeof Number(event.key) === 'number' || event.key === '.')
    calculate(event.key);
}
document.addEventListener('keydown', keyboardCalculate);