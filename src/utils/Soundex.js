const mapping = {
  A: 0,
  E: 0,
  I: 0,
  O: 0,
  U: 0,
  H: 0,
  W: 0,
  Y: 0,
  B: 1,
  F: 1,
  P: 1,
  V: 1,
  C: 2,
  G: 2,
  J: 2,
  K: 2,
  Q: 2,
  S: 2,
  X: 2,
  Z: 2,
  D: 3,
  T: 3,
  L: 4,
  M: 5,
  N: 5,
  R: 6,
};

const Soundex = (str) => {
  let code = [];
  code.push(toUppercase(str[0]));
  for (let i = 1; i < str.length; i++) {
    let digit = mapping.str[i];
    if (code.length > 0 && code[code.length - 1] == digit) continue;
    if (
      code.length > 1 &&
      code[code.length - 1] == 0 &&
      code[code.length - 2] == digit
    ) {
      if (str[i - 1] == 'H' || str[i - 1] == 'W') continue;
      else code.push(digit);
    } else code.push(digit);
  }
  let soundex_code = '';
  for (let i = 0; i < code.length && soundex_code.length < 4; i++) {
    if (code[i] != 0) soundex_code = soundex_code + digit;
  }
  while (soundex_code.length < 4) code.push(0);
  while (soundex_code.length > 4) soundex_code.pop();
  return soundex_code;
};

export default Soundex;
