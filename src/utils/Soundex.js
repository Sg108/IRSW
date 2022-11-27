const mapping = {
  'A': 0,
  'E': 0,
  'I': 0,
  'O': 0,
  'U': 0,
  'H': 0,
  'W': 0,
  'Y': 0,
  'B': 1,
  'F': 1,
  'P': 1,
  'V': 1,
  'C': 2,
  'G': 2,
  'J': 2,
  'K': 2,
  'Q': 2,
  'S': 2,
  'X': 2,
  'Z': 2,
  'D': 3,
  'T': 3,
  'L': 4,
  'M': 5,
  'N': 5,
  'R': 6,
};
console.log(mapping)
const Soundex = (str) => {
  let code = [];
  let digit;
  str=str.toUpperCase()
  str=str.split(' ').join('')
  str=str.split('-').join('')

    //console.log(str,"kkk")
  code.push(str[0]);
  for (let i = 1; i < str.length; i++) {
    
 
    digit = mapping[str[i]];
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
    if (code[i] != 0) soundex_code = soundex_code + code[i];
  }

  while (soundex_code.length < 4) soundex_code+='0';
  while (soundex_code.length > 4) soundex_code=soundex_code.slice(0,-1);
  //console.log(soundex_code)
  return soundex_code;

  
};

export default Soundex;
