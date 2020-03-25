const Array = require('./array');

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    // What is the length, capacity and memory address of your array?
    arr.push(3); // {length: 1, _capacity: 3, ptr: 0}
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10); // {length: 6, _capacity: 12, ptr: 3}
    // The array length is equal to the amount of values pushed. 
    // When the length (3) is greater than or equal to the capacity (3),
    // then (the length + 1) * Array.SIZE_RATIO = 12.
    // The array resized 3 times.

    arr.pop();
    arr.pop();
    arr.pop(); // {length: 3, _capacity: 12, ptr: 3}
    // The array length decreases every time pop() is called.
    // The capacity stays the same and the resize method is not called in the pop().
    console.log(arr);

    // Print the 1st item in array
    console.log(arr.get(0)); // 3

    // Empty the array and add just 1 item: arr.push("tauhida");
    arr.pop();
    arr.pop();
    arr.pop();
    arr.push("tauhida");
    console.log(arr);
    console.log(arr.get(0)); // NaN, Float64Array treats every 8 bytes as a floating point number
    // What is the purpose of the _resize() function in your Array class?
    // It changes the size of the array.
    // It copies each item to a new box and frees the old space.

}

// main();

// Problems 5-12

// 5. URLify a string: Constant O(1)
function urlify(str) {
    let url = str.replace(/ /g, '%20');
    return url;
}

// console.log(urlify('tauhida parveen'));
// console.log(urlify('www.thinkful.com /tauh ida parv een'));

// 6. Filtering an array: Linear O(n)
function removeLessThanFive(arr) {
    let fiveAndAbove = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 5) {
            fiveAndAbove.push(arr[i]);
        }
    }
    return fiveAndAbove;
}

// console.log(removeLessThanFive([1, 8, 3, 5, 6, 7, 2])) // [8, 5, 6, 7]

// 7. Max sum in the array
function maxSum(arr) {
    let sums = [];
    let max;
    for (let i = 0; i < 1; i++) {
        let num = arr[i];
        sums.push(num);
        for (let i = 0; i < arr.length - 1; i++) {
            let sum = sums[i] + arr[i + 1];
            sums.push(sum);
        }
    }
    console.log(sums);
    for (let i = 0; i < sums.length; i++) {
        if (sums[i] > sums[i + 1]) {
            max = sums[i];
        }
    }

    return max;
}

// console.log(maxSum([4, 6, -3, 5, -2, 1])); // 12

// 8. Merge arrays
function mergeTwo(arr1, arr2) {
    let merge = [ ...arr1, ...arr2 ];
    merge.sort((a, b) => a - b);
    return merge;
}

// console.log(mergeTwo([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

// 9. Remove characters
function removeCharacters(str, characters) {
    const strArr = [];
    const charaArr = [];
    let joinStr = '';

    for (let i = 0; i < str.length; i++) {
        strArr.push(str[i]);
    }

    for (let i = 0; i < characters.length; i++) {
        charaArr.push(characters[i]);
    }

    charaArr.forEach(chara => {
        strArr.forEach((s, index) => {
            if (chara === s) {
                strArr.splice(index, 1)
            }
        })
    })

    for (let i = 0; i < strArr.length; i++) {
        joinStr += strArr[i];
    }

    return joinStr;
}

// console.log(removeCharacters('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))

// 10. Products
function products(arr) {
    const product = arr.map((num, i) => {
        const otherNums = arr.slice(0, i).concat(arr.slice((i + 1), (arr.length)));
        console.log(otherNums);
        return otherNums.reduce((acc, cur) => acc * cur);
    });
    return product;
}
// 3 * 9 * 4 = 108
// 1 * 9 * 4 = 36
// 1 * 3 * 4 = 12
// 1 * 3 * 9 = 27
// console.log(products([1, 3, 9, 4])); // [108, 36, 12, 27]

// 11. 2D array // HAVE NOT SOLVED YET
function array2D(grid) {
    const inputGrid = grid;
    let new2dArray = grid;

    inputGrid.map((row, rowIndex) => {
        row.map((number, numberIndex) => {
            if (number === 0) {
                new2dArray[rowIndex].forEach((num, index) => {
                    new2dArray[rowIndex][index] = 0
                })
                new2dArray.forEach(ro => {
                    ro[numberIndex] = 0
                })
            }
        })
    })
    console.log(new2dArray);
    return new2dArray;
}

const testGrid = [
    [1,0,1,1,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,0,1,1,1],
    [1,1,1,1,1]
];

// console.log(array2D(testGrid));

// 12. String rotation
function stringRotation(str1, str2) {

    if (str1.length !== str2.length) {
        return false;
    }

    for (let i = 0; i < str2.length; i++) {
        if (str2[i] === str1[0]) {
            let subStr1 = str2.substring(0, i);
            console.log(subStr1);
            let subStr2 = str2.substring(i, str2.length);
            console.log(subStr2);
            let combineStrings = subStr2.concat(subStr1);

            if (str1 === combineStrings) {
                console.log(str1, combineStrings);
                return true;
            } 
        }
    }

    return false;

}
// console.log(stringRotation('amazon', 'azonma')); // false
// console.log(stringRotation('amazon', 'azonam')); // true
// console.log(stringRotation('abcd', 'cdab')); // true