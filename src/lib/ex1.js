function average(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length;
}

console.log(average([1,2,3,4,5])); // 3
console.log(average(["1","2","3","4","5"])); // 2469
console.log(average([])); // NaN