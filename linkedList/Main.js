import LinkedList from "./LinkedList.js";

const list = new LinkedList();

// Adding elements
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");

console.log(list.toString()); // ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> null

// Removing the last node
list.pop();
console.log(list.toString()); // ( dog ) -> ( cat ) -> ( parrot ) -> null

// Searching for values
console.log(list.contains("cat")); // true
console.log(list.contains("snake")); // false

console.log(list.find("parrot")); // 2
console.log(list.find("hamster")); // null

// Inserting at index
list.insertAt("turtle", 2);
console.log(list.toString()); // ( dog ) -> ( cat ) -> ( turtle ) -> ( parrot ) -> null

// Removing at index
list.removeAt(1);
console.log(list.toString()); // ( dog ) -> ( turtle ) -> ( parrot ) -> null
