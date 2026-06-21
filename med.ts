// npx tsx med.ts

function maxIceCream(costs: number[], coins: number): number {
    const sortedCosts: number[]  = new Array(100001).fill(0);
    let sum = 0;
    let coinsByCost = coins;

    for (let i = 0; i < costs.length; i++) {
        const currentPrice = costs[i];

        sortedCosts[currentPrice]++;
    }

    for (let i = 0; i < sortedCosts.length; i++) {
        while (sortedCosts[i] > 0 && coinsByCost >= i) {
            sum++
            sortedCosts[i]--
            coinsByCost -= i
        }
    }

    return sum
};

// maxIceCream([7,3,3,6,6,6,10,5,9,2], 56) // 9

function angleClock(hour: number, minutes: number): number {
    const sumHour = (hour === 12 ? 0 : hour) * 30 + minutes * 0.5;
    const sumMin = minutes * 6;
    const sum= Math.abs(sumHour - sumMin)

    if (sum > 180) {
        return 360 - sum;
    }

    return sum;
};

angleClock(12, 30)