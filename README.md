Q1. What is the difference between var, let, and const?

ANSWER- 
var,let and const use for variable declare in js but var is old way.
var functional scope but let and const block scope.
var and let allowed reassign but const not allow reassign. 
var allow redeclare but let and const not allow it.
Example-
var a = 10;
var a = 20; // allowed
let b = 10;
b = 20; // allowed
const c = 10;
c = 20;// not allowed


Q2. What is the spread operator (...)?

ANSWER-
Spread operator used to expand or copy elements of an array/object.
Example-
const arr1 = [1,2,3];
const arr2 = [...arr1];// copy 
console.log(arr2);

Q3. Difference between map(), filter(), forEach()

ANSWER-
map() and filter() create a new array but forEach() not allow it.
map() modify every element, filter() use for condition check and forEach() use only looping an array.
Example-
const numbers = [1,2,3];
const double = numbers.map(n => n*2);
console.log(double);//[2,4,6]
const even = numbers.filter(n => n % 2 === 0);
console.log(even); //[2]
numbers.forEach(n=>{
  console.log(n); // 1,2,3
});

Q4.What is an arrow function?

ANSWER-
Arrow function is a short syntax function.
Example
Normal function
function add(a,b){
 return a+b;
}
Arrow function
const add = (a,b) => {
  return a+b;
}


Q5.What are template literals?

ANSWER-
Template literals one of the type of string where we can write variable name.
Example
const name = "Shohag";
const age = 22;
const text = `My name is ${name} and I am ${age} years old`;
console.log(text); //My name is shohag and I am 22 years old