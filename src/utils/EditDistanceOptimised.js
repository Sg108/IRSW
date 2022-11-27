import keyDist from "../utils/KeyboardOptimisedEditDistance"

const min = (arr) => {
    let mine = 1e7
    for (let i of arr) {
        if (i < mine) mine = i
    }
    return mine
}

export const editDistanceOptimised = (str1, str2) => {
    let n1 = str1.length
    let n2 = str2.length
    let prev = new Array(n2 + 1).fill(0)
    for (let i = 1; i <= n2; i++) prev[i] = i
    for (let i = 1; i <= n1; i++) {
        let curr = new Array(n2 + 1).fill(0)
        curr[0] = i
        for (let j = 1; j <= n2; j++) {
            if (str1[i - 1] == str2[j - 1]) curr[j] = prev[j - 1]
            else curr[j] = 1 + min([curr[j - 1], prev[j], prev[j - 1]])
        }
        prev = curr
    }
    return prev[n2]
}

export const editDistanceOptimum = (str1, str2) => {
    // console.log(str1, str2)
    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()
    let n = str1.length
    let m = str2.length
    let dp = new Array(m + 1).fill(0)
    let temp, dist
    for (let i = 1; i <= m; i++) dp[i] = i
    for (let i = 1; i <= n; i++) {
        dist = i - 1
        dp[0] = i
        for (let j = 1; j <= m; j++) {
            temp = dp[j]
            if (str1[i - 1] == str2[j - 1]) dp[j] = dist
            else
                dp[j] =
                    min([
                        dist + keyDist[str1[i - 1]][str2[j - 1]],
                        dp[j] +
                            (i == 1 ? 1.0 : keyDist[str1[i - 1]][str1[i - 2]]),
                        dp[j - 1] + 1.0,
                    ]) + 0.0
            dist = temp
        }
        // console.log(dp)
    }
    return dp[m]
}
