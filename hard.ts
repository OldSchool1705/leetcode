// npx tsx hard.ts

function getKthChar(s: string, k: number): string {
    const n = s.length;
    const lengths: number[] = new Array(n);
    let currentLen = 0;

    for (let i = 0; i < n; i++) {
        if (s[i] === '*') {
            if (currentLen > 0) currentLen--;
        } else if (s[i] === '#') {
            currentLen *= 2;
        } else if (s[i] === '%') {
        } else {
            currentLen++;
        }
        lengths[i] = currentLen;
    }

    if (k < 0 || k >= currentLen) return '.';

    for (let i = n - 1; i >= 0; i--) {
        const char = s[i];
        const prevLen = i > 0 ? lengths[i - 1] : 0;

        if (char === '#') {
            if (k >= prevLen) {
                k %= prevLen;
            }
        } else if (char === '%') {
            k = (lengths[i] - 1) - k;
        } else if (char === '*') {
        } else {
            if (k === lengths[i] - 1) {
                return char;
            }
        }
    }

    return '.';
}

// getKthChar("a#b%*", 1)

function zigZagArrays(n: number, l: number, r: number): number {
    const MOD = 1000000007n;
    const k = r - l + 1;

    if (k < 2) return 0;

    let up: bigint[] = new Array(k).fill(0n);
    let down: bigint[] = new Array(k).fill(0n);

    for (let v = 0; v < k; v++) {
        up[v] = BigInt(v);

        down[v] = BigInt(k - 1 - v);
    }

    for (let length = 3; length <= n; length++) {
        const nextUp: bigint[] = new Array(k).fill(0n);
        const nextDown: bigint[] = new Array(k).fill(0n);

        let currentSumDown = 0n;
        for (let v = 0; v < k; v++) {
            nextUp[v] = currentSumDown % MOD;
            currentSumDown += down[v];
        }

        let currentSumUp = 0n;
        for (let v = k - 1; v >= 0; v--) {
            nextDown[v] = currentSumUp % MOD;
            currentSumUp += up[v];
        }

        up = nextUp;
        down = nextDown;
    }

    let totalSum = 0n;
    for (let v = 0; v < k; v++) {
        totalSum = (totalSum + up[v] + down[v]) % MOD;
    }

    return Number(totalSum);
}

// zigZagArrays(3, 4, 5)

function zigZagArrays2(n: number, l: number, r: number): number {
    const MOD = 1_000_000_007;
    const k = r - l + 1;

    if (k <= 1) return 0;
    if (n === 1) return k;

    const sz = 2 * k;

    function multiply(A: number[][], B: number[][]): number[][] {
        const C: number[][] = Array.from({ length: sz }, () => new Array(sz).fill(0));
        for (let i = 0; i < sz; i++) {
            for (let idx = 0; idx < sz; idx++) {
                if (A[i][idx] === 0) continue;
                for (let j = 0; j < sz; j++) {
                    C[i][j] = (C[i][j] + A[i][idx] * B[idx][j]) % MOD;
                }
            }
        }
        return C;
    }

    function power(matrix: number[][], p: number): number[][] {
        let res: number[][] = Array.from({ length: sz }, (_, i) => {
            const row = new Array(sz).fill(0);
            row[i] = 1;
            return row;
        });
        let base = matrix;
        while (p > 0) {
            if (p % 2 === 1) {
                res = multiply(res, base);
            }
            base = multiply(base, base);
            p = Math.floor(p / 2);
        }
        return res;
    }

    const M: number[][] = Array.from({ length: sz }, () => new Array(sz).fill(0));
    for (let v = 0; v < k; v++) {
        for (let next_v = 0; next_v < v; next_v++) {
            M[next_v * 2 + 1][v * 2] = 1;
        }
        for (let next_v = v + 1; next_v < k; next_v++) {
            M[next_v * 2][v * 2 + 1] = 1;
        }
    }

    const V = new Array(sz).fill(0);
    for (let prev = 0; prev < k; prev++) {
        for (let curr = 0; curr < k; curr++) {
            if (curr > prev) {
                V[curr * 2] += 1;
            } else if (curr < prev) {
                V[curr * 2 + 1] += 1;
            }
        }
    }

    if (n === 2) {
        let total = 0;
        for (let i = 0; i < sz; i++) total = (total + V[i]) % MOD;
        return total;
    }

    const Mp = power(M, n - 2);

    let ans = 0;
    for (let i = 0; i < sz; i++) {
        let current_state_count = 0;
        for (let j = 0; j < sz; j++) {
            current_state_count = (current_state_count + Mp[i][j] * V[j]) % MOD;
        }
        ans = (ans + current_state_count) % MOD;
    }

    return ans;
}

zigZagArrays2(3,4, 5)
