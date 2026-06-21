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