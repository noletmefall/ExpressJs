function getRandomValue() {
  return (Math.random() * 26).toFixed(2);
}

function generateRandomValues() {
  const values = [];
  for (let i = 0; i < 5; i++) {
    values.push(getRandomValue());
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

const randomValues = generateRandomValues();

printValues(randomValues);

setInterval(() => {
  printValues(randomValues);
}, 5000);