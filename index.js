// let user =  {
//     name: "John",
//     age: 30,
//     city: "New York"
// };

// user.seyHello = function() {
//     console.log(`Hello, my name is ${this.name} and I am ${this.age} years old. I live in ${this.city}.`);
// }

// user.seyHello();


// let user = {
//   firstName: "Ilya",
//   sayHi() {
//     let arrow = () => console.log(this.firstName);
//     arrow();
//   }
// };

// user.sayHi();

// Function.prototype.myCall = function(context, ...args) {
//   context.temp = this;
//   const result = context.temp(...args);
//   delete context.temp;

//   return result;
// };


// function greet(greeting, punctuation) {
//   return greeting + ', ' + this.name + punctuation;
// }

// const user = { name: 'Артём' };

// console.log(greet.myCall(user, 'Привет', '!'));  // → Привет, Артём!
// console.log(greet.myCall(user, 'Здарова', '?')); // → Здарова, Артём?

// function introduce(city, age) {
//   return this.name + ' из ' + city + ', ' + age + ' лет';
// }

// const person = { name: 'Артём' };

// const result = introduce.call(person, 'Гомель', 28);
// console.log(result);

// function Counter(start) {
//   this.count = start;
// }

// Counter.prototype.increment = function() {
//   this.count++;
//   return this;
// };

// Counter.prototype.getCount = function() {
//   return this.count;
// };

// Counter.prototype.delayedLog = function() {
//   setTimeout(function() {
//     console.log('A:', this.count);
//   }, 0);

//   setTimeout(() => {
//     console.log('B:', this.count);
//   }, 0);
// };

// const c1 = new Counter(0);
// const c2 = new Counter(100);

// c1.increment().increment().increment();
// c2.increment();

// console.log('C:', c1.getCount());
// console.log('D:', c2.getCount());

// c1.delayedLog();