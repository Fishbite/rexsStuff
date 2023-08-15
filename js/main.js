// console.log("main.js :oP", "yes".padEnd(9, "!"), "7".padStart(3, "0"));
// "yes".padEnd(6, "!");
// loops
// let planets = ["jupiter", "venus", "saturn", "mars"];

// for (let i = 0; i < planets.length; i++) {
//   planet = planets[i];
//   console.log(planet);
// }

class Robot {
  constructor(config) {
    // default props
    this.name = "Art";
    this.material = "titanium";
    this.happy = true;
    this.say = "Grub up for breakfast boss";

    // copy all the properties of the config object
    // onto `this` object
    Object.assign(this, config);
  }

  makeBreakfast(name) {
    if (this.name === "Art") {
      this.say = "Grub up for breakfast boss";
      console.log(this.say);
    } else {
      this.say = `${this.name}? WTF!!!!??? Make yer own grub cum gruel for breakfast, you slimey bucket of rotting fishheads`;
      console.log(this.say);
    }
  }
}

console.log(Object.keys(Robot), Robot);
// use the Robot class to create a new object
// using a config object to set property values
let iRobot = new Robot({
  laserGun: true, // add a new property to the Robot class
  name: "Wilf", // change a property of the Robot class
});

iRobot.makeBreakfast();
console.log(iRobot.laserGun, iRobot.material);
console.log(Object.entries(iRobot));

//
class badRobot extends Robot {
  constructor(config) {
    super();
    Object.assign(this, config);
    this.foo = true;
  }
}

const grumpyBot = new badRobot({
  happy: false,
  badness: "Extremely",
});

console.log(Object.entries(new badRobot()));
console.log(Object.entries(grumpyBot));
for (let i in grumpyBot) {
  console.log(`${i}: ${grumpyBot[i]}`);
}

// composition. How doess that work?
// simply wrap an object in a function and make it return that object.
// All methods within the function are private unless attached
// to the object that is returned. See the `speak` method below
function animal() {
  //Declare the variables we'll use in this function
  let newObject, words;
  //A helper function to return a random integer within a minimum and maximum range
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //The animal's vocabulary
  words = ["Food!", "Sleep!", "Video games!"];
  //A `speak` function that chooses random words
  function speak() {
    let say = words[random(0, 2)];
    console.log(say);
  }
  //Create a `newObject` and add the `speak` function to it
  newObject = {};
  // make the `speak` method public
  newObject.speak = speak;
  //Return the `newObject`
  return newObject;
}

let cat = animal();
cat.speak();
