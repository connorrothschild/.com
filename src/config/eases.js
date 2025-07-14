const easeInOutQuint = [0.9, 0, 0.1, 1];

function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;
  return x === 0
    ? 0
    : x === 1
    ? 1
    : 2 ** (-10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

export { easeInOutQuint, easeOutElastic };
