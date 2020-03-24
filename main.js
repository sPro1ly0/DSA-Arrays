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
    // console.log(arr);

    // Print the 1st item in array
    // console.log(arr.get(0)); // 3

    // Empty the array and add just 1 item: arr.push("tauhida");
    arr.pop();
    arr.pop();
    arr.pop();
    arr.push("tauhida");
    // console.log(arr);
    // console.log(arr.get(0)); // NaN, Float64Array treats every 8 bytes as a floating point number
    // What is the purpose of the _resize() function in your Array class?
    // It changes the size of the array.
    // It copies each item to a new box and frees the old space.

}

main();

// Problems 5-12

// 5. URLify a string
function urlify(str) {

}

console.log(urlify('www.thinkful.com /tauh ida parv een'));