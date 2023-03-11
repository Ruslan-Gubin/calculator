function roundBigString(num: string) {
  let result = [];
  let incrementZero = 0;
  let checkOnZero = false;
  for (let i = num.split("").length - 1; i > -1; i--) {
    if (num.split("")[i] === "0") {
      incrementZero++;
      if (checkOnZero !== false) {
        result.push(num.split("")[i]);
      }
    } else {
      checkOnZero = true;
      result.push(num.split("")[i]);
    }
  }
  let reverseResult = result.reverse();
  reverseResult.unshift(".");
  reverseResult.unshift(String(incrementZero));
  return reverseResult.join("");
}

export { roundBigString };
