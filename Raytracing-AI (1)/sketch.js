let cars = [];
let savedCars = [];
let path;
const popSize = 12;
const maxLife = 640;
let generations = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < popSize; i++) {
    const x = width/2 + random(-72, 72);
    cars.push(new Car(x, height-48, 3));
  }

  //savedCars = cars.map(car => car.copy());
  savedCars = cars.slice();

  path = new Path();
  path.left = [createVector(width/2-108, height), createVector(width/2-108, 0)]
  path.right = [createVector(width/2+108, height), createVector(width/2+108, 0)]
}

function draw() {
  background(51);
  fill(255);
  text(`Generation Length: ${frameCount % maxLife}
Total Generations: ${generations}`, 12, 24);

  if (frameCount % maxLife === 0) {
    calcFitness();
    normFitness();
    nextGeneration();
    generations++;
    //savedCars = cars.map(car => car.copy());
    savedCars = cars.slice();
  }

  let target = createVector(mouseX, mouseY);

  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    //car.applyForce(car.seek(target));
    //car.look(path);

    car.think(path);
    car.render();
    car.update();
    if (car.isDead(path)) {
      savedCars.push(cars.splice(i, 1)[0].copy());
      i--;
    }
  }

  path.render();
}