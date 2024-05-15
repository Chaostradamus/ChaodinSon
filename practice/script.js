let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
];

// returns array of the first two users
let someUsers = users.filter((item) => item.id < 3);

alert(someUsers.length); // 2


function unique(arr){
    let result = []

    for (let name of arr){
        if(!result.includes(name)){
            result.push(str)
        }
    }
    return result
}

groupById(arr) {
arr.reduce((obj, item) => {
   obj[item.id] = item
   return obj
})
}