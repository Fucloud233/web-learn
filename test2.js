fruits = ["Banana", "Orange", "Apple"]
for(let i=0; i<fruits.length; i++) {
    console.log(fruits[i]);
}

flag1 = Array.isArray(fruits)
flag2 = fruits instanceof Array

// 
console.log(flag1)
console.log(flag2)

// for(fruit in fruits) {
//     console.log(fruit);
// }

nums  = [3, 1, 4, 1, 5]
len = nums.length
new_nums = []
for(let i=0; i<len; i++) {
    new_nums.push(nums[i]);
}

// for(let i=0; i<len; i++) {
//     console.log(new_nums.pop(), new_nums.length);
// }

// for(let i=0; i<len; i++) {
//     console.log(new_nums.shift(), new_nums.length)
// }

fruits = ["Banana", "Orange", "Apple", "Mango"]
// first paramenter the pos to add
// second parameter defines how many elements should be remvoed
// fruits.splice(2, 0, "Lemon", "Kiwi");
fruits.splice(2, 0, "Lemon", "Kiwi");
console.log(fruits)

citrus = fruits.slice(1, 3)
console.log(citrus)

