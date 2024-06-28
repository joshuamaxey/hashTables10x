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
    // Your code here
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
