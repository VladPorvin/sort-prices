// Пример использования функции. Дополнительное задание

let newArr, courses;
const url = '/scripts/database.json',
  sortBtn = document.querySelector('.sort__button'),
  sortPriceBtn = document.querySelector('.sort-price__button');

// Имитация получения данных с сервера
const getCourses = async (coursesURL) => {
  try {
    const response = await fetch(coursesURL);
    const courses = await response.json();
    return courses;
  } catch (err) {
    alert(`Error >>`, err);
  }
};
getCourses(url).then((data) => {
  courses = data;
});

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
// Фильтр-функция
function filterPrice(minCurrentPrice, maxCurrentPrice) {
  const minPriceUsers = normalize(minCurrentPrice, 'min');
  const maxPriceUsers = normalize(maxCurrentPrice, 'max');
  newArr = courses.filter((el) => {
    let minCoursePrice = normalize(el.prices[0], 'min');
    let maxCoursePrice = normalize(el.prices[1], 'max');
    return !(
      (minPriceUsers < minCoursePrice && maxPriceUsers < minCoursePrice) ||
      (minPriceUsers > maxCoursePrice && maxPriceUsers > maxCoursePrice)
    );
  });
}

// Сортируем цены по диапазону при нажатии на кнопку (дополнительное задание)
sortBtn.addEventListener('click', () => {
  const minValue = document.querySelector('.min').value;
  const maxValue = document.querySelector('.max').value;
  filterPrice(minValue, maxValue);
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
