const min = (arr) => {
  let mine = 1e7;
  for (let i of arr) {
    if (i < mine) mine = i;
  }
  return mine;
};

const EditDistanceOptimised = (str1, str2) => {
  let n1 = str1.length;
  let n2 = str2.length;
  let prev = new Array(n2 + 1).fill(0);
  for (let i = 1; i <= n2; i++) prev[i] = i;
  for (let i = 1; i <= n1; i++) {
    let curr = new Array(n2 + 1).fill(0);
    curr[0] = i;
    for (let j = 1; j <= n2; j++) {
      if (str1[i - 1] == str2[j - 1]) curr[j] = prev[j - 1];
      else curr[j] = 1 + min([curr[j - 1], prev[j], prev[j - 1]]);
    }
    prev = curr;
  }
  return prev[n2];
};

export default EditDistanceOptimised;
