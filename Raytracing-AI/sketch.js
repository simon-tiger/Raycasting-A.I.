const cars = [];
let path;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 6; i++) {
    const x = width/2 + random(-48, 48);
    cars.push(new Car(x, height-50, 5));
  }

  path = new Path();
  path.left = [createVector(width/2-72, height), createVector(width/2-72, 0)]
  path.right = [createVector(width/2+72, height), createVector(width/2+72, 0)]
}

function draw() {
  background(51);
  let target = createVector(mouseX, mouseY);

  fill(0, 255, 0)
  ellipse(target.x, target.y, 48, 48);

  for (let car of cars) {
    //car.applyForce(car.seek(target));
    car.look(path);
    car.render();
    car.update();
  }

  path.render();
}