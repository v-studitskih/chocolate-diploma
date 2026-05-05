// const fs = require("fs")

// const input = fs.readFileSync(0, 'utf-8').trim().split("\n").map(str => parseInt(str, 10))

// const n = input[0]
// const m = input[1]

const n = 4
const m = 4

const mod = BigInt(10**9+7)

function modPow(base, exp,mod) {
    let result = 1n
    b = BigInt(base) % mod
    let e = BigInt(exp)
    while (e > 0) {
        if (e & 1n) result = (result * b) % mod
        b = (b * b) % mod
        e >>= 1n

    }
    return result
}

function findIntrestingVariants(n, m) {
    if (n === 1) {
        return (BigInt(m) * BigInt(m-1)) % mod

    }

    let first = (BigInt(m) * BigInt(m-1)) % mod
    let inner = (BigInt(m-2) * BigInt(m-2) + BigInt(m-1)) % mod
    let power = modPow(inner, n - 1, mod)
    return Number((first * power) % mod)
}

console.log(findIntrestingVariants(n, m));


