// npx tsx easy.ts
function minimumPairRemoval(nums: number[]): number {
    let operations = 0;
    while (true) {
        let isSorted = true;
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                isSorted = false;
                break;
            }
        }

        if (isSorted) {
            return operations;
        }

        let minSum = nums[0] + nums[1];
        let minIndex = 0;

        for (let i = 0; i < nums.length - 1; i++) {
            const current = nums[i];
            const left = nums[i + 1];
            const result = current + left;

            if (result < minSum) {
                minSum = result;
                minIndex = i;
            }
        }

        nums.splice(minIndex, 2, minSum);

        operations++;
    }
}

// minimumPairRemoval([5,2,3,1]) // 2
// minimumPairRemoval([1,2,2]) // 0

// O(NlogN)
function minimumDifference(nums: number[], k: number): number {
    let numSort = nums.sort((a, b) => a - b);
    let minDiff = Infinity

    for (let i = 0; i <= numSort.length - k; i++) {
        const difference = numSort[i + k - 1] - numSort[i];
        if (difference < minDiff) {
            minDiff = difference;
        }
    }

    return minDiff
};

// minimumDifference([90], 1) // 0
// minimumDifference([9,4,1,7], 2) // 2

function minimumAbsDifference(arr: number[]): number[][] {
    let numSort = arr.sort((a, b) => a - b);
    const index = 2
    let differencePair = Infinity
    let res: [number, number][] = []

    for (let i = 0; i <= numSort.length - index; i++) {
        const difference = numSort[i + index - 1] - numSort[i];

        if (difference < differencePair)  {
            differencePair = difference
            res = []
            res.push([numSort[i], numSort[i + 1]]);
        } else if (difference === differencePair) {
          res.push([numSort[i], numSort[i + 1]]);
        }
    }
    return res
};

// minimumAbsDifference([4,2,1,3])
// minimumAbsDifference([1,3,6,10,15])
// minimumAbsDifference([3,8,-10,23,19,-4,-14,27])