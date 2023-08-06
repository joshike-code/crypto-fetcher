//expression
const PersonCl1 = class {

}

//declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  hello() {
    console.log('Hello World!');
  }

  get age() {
    return console.log(2037 - this.birthYear);
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey, I am static');
  }
};

const jessica = new PersonCl('Jessica Knowles', 1996);
// console.log(jessica);
// jessica.calcAge();

PersonCl.prototype.greet = function() {
  console.log(`${this.firstName} greets everyone`);
};
// jessica.greet();

jessica.age;
// console.log(jessica.fullName);

const walter = new PersonCl('Walter White', 1965);
console.log(walter);

PersonCl.hey();




const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  
  set latest(mov) {
    this.movements.push(mov);
  }
};


account.latest = 900;
// console.log(account.latest);














