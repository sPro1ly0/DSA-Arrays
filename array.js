const Memory = require('./memory');
const memory = new Memory();
// use memory module to build an array
class Array {
    constructor() {
        // array starts with length of 0
        this.length = 0;
        // capacity, how many items you can hold without needing to resize.
        this._capacity = 0;
        // pointer to 0 blocks of memory
        this.ptr = memory.allocate(this.length);
    }

    // push new element to end of the array
    // In the best and average case for pushing you won't need to resize,
    // so these become O(1) operations.
    // In the worst case, you still need to resize
    // so that remains O(n).
    push(value) {
        // allocate more space than you need instead of pushing every time for new data
        if (this.length >= this._capacity) {
            // resize the array to have space for new item
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        // set the memory of the final block to contain/equal the new value
        memory.set(this.ptr + this.length, value); // O(1) constant
        this.length++;
    }

    // allocate a new, larger chunk of memory, 
    // copy any existing values from the old to the new chunk,
    // and free the old chunk
    // resize operation has a worst, best, and average case of O(n) Linear time
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr == null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }

    // All this does is add an index offset, and get the value stored at a memory address.
    // Both are O(1) operations, so retrieving values from any point in an array also has best, worst, and average-case performance of O(1).
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    // pointer arithmetic and memory access it's an O(1) operation.
    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }
    // So insertion has a best-case performance of O(1), the same as pushing.
    // The worst case is inserting the value at the start of the array.
    // This requires every value to be shifted 1 memory address later;
    // that's n copies, so it's O(n).
    // The average case would be inserting a value into the middle of the array.
    // Here you would need to shift half of the values along.
    // That's n/2 copies, so the average case is also O(n) as you ignore the constant factor of 1/2.
    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }
    // Using the same logic as for insertion,
    // the best-case performance is O(1) (the same as popping),
    // and the average and worst cases are O(n).
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}
// each time you go over the capacity, you triple the size of memory which is allocated
Array.SIZE_RATIO = 3;

module.exports = Array;