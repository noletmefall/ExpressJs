function getRandomValue() {
  return (Math.random() * 26).toFixed(2);
}

function getRandomStep() {
  return (Math.random() * 11 - 5).toFixed(2);
}

// Функция для генерации массива из 5 случайных чисел
function generateRandomValues(previousValues) {
  const values = [];
  for (let i = 0; i < 5; i++) {
    let newValue;
    if (previousValues && previousValues[i] !== undefined) {
      let step = parseFloat(getRandomStep());
      newValue = parseFloat(previousValues[i]) + step;
      newValue = Math.min(Math.max(newValue, 0), 25); // Ограничиваем значение между 0 и 25
    } else {
      newValue = parseFloat(getRandomValue());
    }
    values.push(newValue.toFixed(2));
  }
  return values;
}

function printValues(values) {
  console.log('Мммм, баунти:');
  values.forEach((value, index) => {
    console.log(`Содержание букашек на квадратный милиметр, в объекте под номером - ${index + 1}: ${value}`);
  });
  console.log('------------------------');
}


function startInterval() {
  let previousValues = generateRandomValues();
  
  printValues(previousValues);
  
  setInterval(() => {
    const newValues = generateRandomValues(previousValues);
    printValues(newValues);
    previousValues = newValues;
  }, 5000);
};

startInterval();