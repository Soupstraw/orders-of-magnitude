export function scrollBy(amtY) {
  return function (element) {
    return function () {
      element.scrollBy(0, amtY);
    };
  };
}
