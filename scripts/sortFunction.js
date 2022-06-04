// Функция для проверки на пустоту, что эквивалентно САМОМУ минимальному/максимальному
function normalize(someNum, flag) {
  if (someNum === '' || someNum === null) {
    return flag === 'min' ? -Infinity : Infinity;
  }
  return someNum;
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
