// функция проверки длины строки
const checkedLineLength = (line = '', maxLength = 1) => line.length <= maxLength;


//функция проверки на палидромность
const checkedPalidrom = function (line = '') {
  line = line.toString().toLowerCase().replace(/[^а-яa-z0-9]/g, '');
  const newLine = line.split('').reverse().join('');
  return newLine === line;
};


// извлечение цифр из строки
function extractNumbersFromTheLine(line = '') {
  const lineToString = line.toString().replace(/[^0-9]/g, '');
  return lineToString === '' ? NaN : parseInt(lineToString, 10);
}

checkedLineLength('проверяемая строка', 20); // строка короче 20 символов - true
checkedLineLength('проверяемая строка', 18); // строка равна 18 символам - true
checkedLineLength('проверяемая строка', 10); // строка длинее 10 симолов - false


checkedPalidrom('топот'); // Строка является палиндромом - true
checkedPalidrom('ДовОд'); // Несмотря на разный регистр, тоже палиндром - true
checkedPalidrom('Кекс'); // Это не палиндром - false
checkedPalidrom('Лёша на полке клопа нашёл '); // Это палиндром - true


extractNumbersFromTheLine('2023 год'); // 2023
extractNumbersFromTheLine('ECMAScript 2022'); //2022
extractNumbersFromTheLine('1 кефир, 0.5 батона'); // 105
extractNumbersFromTheLine('агент 007'); // 7
extractNumbersFromTheLine('а я томат'); // NaN


extractNumbersFromTheLine(2023); // 2023
extractNumbersFromTheLine(-1); // 1
extractNumbersFromTheLine(1.5); // 15


// console.log('Проверка строки на максимальную длину');
// console.log(checkedLineLength('проверяемая строка', 20)); // строка короче 20 символов
// console.log(checkedLineLength('проверяемая строка', 18)); // строка равна 18 символам
// console.log(checkedLineLength('проверяемая строка', 10)); // строка длинее 10 симолов


// console.log('\nпроверка на палидромность');
// console.log(checkedPalidrom('топот')); // Строка является палиндромом
// console.log(checkedPalidrom('ДовОд')); // Несмотря на разный регистр, тоже палиндром
// console.log(checkedPalidrom('Кекс')); // Это не палиндром
// console.log(checkedPalidrom('Лёша на полке клопа нашёл ')); // Это палиндром


// console.log('\nИзвлечение цифр из строки (>0): Строки');
// console.log(extractNumbersFromTheLine('2023 год'));
// console.log(extractNumbersFromTheLine('ECMAScript 2022'));
// console.log(extractNumbersFromTheLine('1 кефир, 0.5 батона'));
// console.log(extractNumbersFromTheLine('агент 007'));
// console.log(extractNumbersFromTheLine('а я томат'));


// console.log('\nИзвлечение цифр из строки (>0): Числа');
// console.log(extractNumbersFromTheLine(2023));
// console.log(extractNumbersFromTheLine(-1));
// console.log(extractNumbersFromTheLine(1.5));

