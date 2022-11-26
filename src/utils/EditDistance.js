const min = (arr) => {
  let mine = 1e7;
  for (let i of arr) {
    if (i < mine) mine = i;
  }
  return mine;
};

const EditDistance = (str1, str2) => {
  let n1 = str1.length;
  let n2 = str2.length;
  let dp = [];
  for (let i = 0; i <= n1; i++) dp.push(new Array(n2 + 1).fill(0));
  for (let i = 1; i <= n1; i++) dp[i][0] = i;
  for (let j = 1; j <= n2; j++) dp[0][j] = j;
  for (let i = 1; i <= n1; i++) {
    for (let j = 1; j <= n2; j++) {
      if (str1[i - 1] == str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + min([dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]]);
    }
  }
  return dp[n1][n2];
};

export default EditDistance;
