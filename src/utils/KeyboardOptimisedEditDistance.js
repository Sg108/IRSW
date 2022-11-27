let neighbors_of = {}

neighbors_of["q"] = ["w", "a"]
neighbors_of["w"] = ["e", "s", "a", "q"]
neighbors_of["e"] = ["r", "d", "s", "w"]
neighbors_of["r"] = ["t", "f", "d", "e"]
neighbors_of["t"] = ["y", "g", "f", "r"]
neighbors_of["y"] = ["u", "h", "g", "t"]
neighbors_of["u"] = ["i", "j", "h", "y"]
neighbors_of["i"] = ["o", "k", "j", "u"]
neighbors_of["o"] = ["p", "l", "k", "i"]
neighbors_of["p"] = ["l", "o"]
neighbors_of["a"] = ["q", "w", "s", "z"]
neighbors_of["s"] = ["w", "e", "d", "x", "z", "a"]
neighbors_of["d"] = ["e", "r", "f", "c", "x", "s"]
neighbors_of["f"] = ["r", "t", "g", "v", "c", "d"]
neighbors_of["g"] = ["t", "y", "h", "b", "v", "f"]
neighbors_of["h"] = ["y", "u", "j", "n", "b", "g"]
neighbors_of["j"] = ["u", "i", "k", "m", "n", "h"]
neighbors_of["k"] = ["i", "o", "l", "m", "j"]
neighbors_of["l"] = ["o", "p", "k"]
neighbors_of["z"] = ["a", "s", "x"]
neighbors_of["x"] = ["s", "d", "c", "z"]
neighbors_of["c"] = ["d", "f", "v", "x"]
neighbors_of["v"] = ["f", "g", "b", "c"]
neighbors_of["b"] = ["g", "h", "n", "v"]
neighbors_of["n"] = ["h", "j", "m", "b"]
neighbors_of["m"] = ["j", "k", "n"]

// console.log(neighbors_of)

console.log(Object.keys(neighbors_of))
let keys = Object.keys(neighbors_of).sort()
// console.log(keys)
let dists = {}
for (let key in keys) {
    dists[keys[key]] = {}
}
console.log(dists)

function distance(start, end) {
    // console.log(start, end)
    if (start === end) return 1
    let visited = new Set()
    visited.add(start)
    let queue = [{ char: start, dist: 0 }]
    // console.log(queue)
    while (queue.length > 0) {
        let key = queue.shift()
        // console.log(key)
        if (key["char"] === end) {
            return key["dist"]
        }
        for (let neighbor of neighbors_of[key["char"]]) {
            // console.log("    ", neighbor)
            if (!visited.has(neighbor)) {
                queue.push({
                    char: neighbor,
                    dist: key["dist"] + 1,
                })
                visited.add(neighbor)
            }
        }
        // console.log(queue)
    }

    return -1
}

let longest_dist = 0
let avg_dist = 0
// console.log(distance("r", "l"))
for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
        let dist = distance(keys[i], keys[j])
        console.log(keys[i], keys[j], dist)
        dists[keys[i]][keys[j]] = 2 - (2 * dist) / 9.0
        avg_dist += dists[keys[i]][keys[j]]
        if (dist > longest_dist) {
            longest_dist = dist
        }
    }
}
let key_dist = longest_dist
avg_dist /= keys.length ** 2
console.log("average distance : ", avg_dist)
let avg_dist2 = 0
for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
        dists[keys[i]][keys[j]] /= avg_dist
        avg_dist2 += dists[keys[i]][keys[j]]
    }
}
console.log(dists)
