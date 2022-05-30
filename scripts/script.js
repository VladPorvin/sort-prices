let courses = [
  { name: 'Courses in England', prices: [0, 100] },
  { name: 'Courses in Germany', prices: [500, null] },
  { name: 'Courses in Italy', prices: [100, 200] },
  { name: 'Courses in Russia', prices: [null, 400] },
  { name: 'Courses in China', prices: [50, 250] },
  { name: 'Courses in USA', prices: [200, null] },
  { name: 'Courses in Kazakhstan', prices: [56, 324] },
  { name: 'Courses in France', prices: [null, null] },
];
let newArr = [];
const sortBtn = document.querySelector('.sort__button');
const sortPriceBtn = document.querySelector('.sort-price__button');

// Функция для проверки на пустоту, что эквивалентно САМОМУ минимальному/максимальному
function normalize(someNum, flag) {
  if (someNum === '' || someNum === null) {
    return flag === 'min' ? -Infinity : Infinity;
  }
  return someNum;
}
// Вставляем разметку в список .list
function listIn(arr) {
  const list = document.querySelector('.list');
  list.innerHTML = '';
  arr.forEach((elem) => {
    list.innerHTML += `
    <li class="list__item">
        <a class="list__item-link" href="#">${elem.name}</a>
    </li>
    `;
  });
}
// Сортируем цены по диапазону при нажатии на кнопку
sortBtn.addEventListener('click', () => {
  const minValue = document.querySelector('.min').value;
  const maxValue = document.querySelector('.max').value;
  const minInput = normalize(minValue, 'min');
  const maxInput = normalize(maxValue, 'max');
  //   Проверка на вхождение диапазона из данного объекта в интервал введеных
  newArr = courses.filter((el) => {
    let minCurrentPrice = normalize(el.prices[0], 'min');
    let maxCurrentPrice = normalize(el.prices[1], 'max');
    return !(
      (minInput < minCurrentPrice && maxInput < minCurrentPrice) ||
      (minInput > maxCurrentPrice && maxInput > maxCurrentPrice)
    );
  });
  listIn(newArr);
});
//   Сортировка по минимальной цене
sortPriceBtn.addEventListener('click', () => {
  newArr.sort((a, b) => {
    if (a.prices[0] === null) {
      a.prices[0] = -Infinity;
    }
    return a.prices[0] - b.prices[0];
  });
  listIn(newArr);
});
