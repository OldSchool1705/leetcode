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
