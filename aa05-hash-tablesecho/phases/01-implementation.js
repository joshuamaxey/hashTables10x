class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // let index = this.hashMod(key);//position index in the data array
    // let kvp = new KeyValuePair(key,value);
    // if(!this.data[index])
    //   //checking the index in the data array to see if there is already a key-value
    //   {
    //       this.data[index] = kvp;

    // }
    // else{
    //   kvp.next = this.data[index];
    //   this.data[index] = kvp;
    //   this.count++
    // }

    let index = this.hashMod(key);//position index in the data array
    let kvp = new KeyValuePair(key,value);
    let currPair = this.data[index];//if there anything in the index we are assining to the varriable
    while(currPair && currPair.key !== key){
        currPair = currPair.next
    }

    if(currPair){//when the key matches to our new key
      currPair.value = value;//update the value
    }
    else{
      //if the bucket in empty
      if(!this.data[index]){
        this.data[index] = kvp;
      }
      else{
        //if the bucket in not empty
        //assign the ole 0ne into the our kvps next
        // set the kvp to the new head of the linked list
        kvp.next = this.data[index];
        this.data[index] = kvp;

      }
    }
    this.count++

  }


  read(key) {
    let index = this.hashMod(key); // This is the index where we will store our key-value pair

    let currPair = this.data[index]; // currPair is the key-value pair located at this index

    while(currPair){ // While there is a key-value pair located at our index

      if(currPair.key === key){ // Check to see if the key of that key-value pair matches our new key

        return currPair.value // If the key matches our new key, we return the value;
      }
      currPair = currPair.next; // If the keys do not match, move to the next key-value pair in the linked list
    }

    return undefined; // If we search the entire bucket (every key-value pair in the lined list) and do not find the key, return undefined
  }


  resize() {
    //   this.data.length = this.capacity;
    // let newArr = new Array(this.capacity).fill(null);
    // this.data = this.data.concat(newArr);
    // this.capacity = this.capacity*2;

    this.capacity *= 2; // double the capacity of our hashTable

    let newArr = new Array(this.capacity).fill(null); // create a new array that is 2x as large, then fill it with null;

    let oldData = this.data; // Save our current data to a variable oldData

    this.data = newArr; // set our this.data to be our new array

    this.count = 0; // initialize a count variable to begin iteration

    for (let i = 0; i < oldData.length; i++) { // iterate through old data

      let current = oldData[i]; // store the key-value pair located at current index of old data array

      while (current) { // While there is a key-value pair located at the current index of the old data array...

        this.insert(current.key, current.value); // ...insert that key-value pair at the same index of the new data array

        current = current.next; // Then move to the next index
      }
    }
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
