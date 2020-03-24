// Memory Module: simulates a block of memory
class Memory {
    constructor() {
      this.memory = new Float64Array(1024);
      this.head = 0;
    }
    // reserves a contiguous block of memory made of size boxes
    // which you can safely modify, returning a pointer to the 1st box or null
    // if the allocation(assign) fails
    allocate(size) {
      if (this.head + size > this.memory.length) {
        return null;
      }
  
      let start = this.head;
  
      this.head += size;
      return start;
    }
    // ptr = pointer
    // frees the block of memory reserved using allocate
    free(ptr) {}
    // copies size boxes of data from the 'from pointer' to the
    // 'to pointer' 
    // ex. copy(10, 0, 3) -> copies 3 size boxes' values 
    // starting from 0, 1, 2 
    // to 10, 11, 12
    copy(toIdx, fromIdx, size) {
      if (fromIdx === toIdx) {
        return;
      }
  
      if (fromIdx > toIdx) {
        // Iterate forwards
        for (let i = 0; i < size; i++) {
          this.set(toIdx + i, this.get(fromIdx + i));
        }
      } else {
        // Iterate backwards
        for (let i = size - 1; i >= 0; i--) {
          this.set(toIdx + i, this.get(fromIdx + i));
        }
      }
    }
    // returns the value at a certain memory address
    get(ptr) {
      return this.memory[ptr];
    }
    // sets the value stored at a certain memory address
    set(ptr, value) {
      this.memory[ptr] = value;
    }
  }
  
  module.exports = Memory;