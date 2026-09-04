class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(car) {
    this.#brand = car.brand;
    this.#model = car.model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk Open: ${this.isTrunkOpen}`
    );
  }

  go() {
    this.speed += 5;
    if (this.speed > 200) {
      this.speed = 200;
    }
    if (this.speed > 0) {
      this.isTrunkOpen = false;
    }
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(car) {
    super(car);
    this.acceleration = car.acceleration;
  }

  go() {
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300;
    }
    if (this.speed > 0) {
      this.isTrunkOpen = false;
    }
  }
}

const car1 = new Car({ brand: 'Tyota', model: 'Corolla' });
const car2 = new Car({ brand: 'Tesla', model: 'Model 3' });
const car3 = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 20 });

console.log(car1);
console.log(car2);

car1.brake();
car1.openTrunk();
car1.displayInfo();
car1.go();
car1.openTrunk();
car1.displayInfo();
car1.brake();
car1.openTrunk();
car1.displayInfo();
car1.closeTrunk();
car1.displayInfo();

car3.go();
car3.displayInfo();
