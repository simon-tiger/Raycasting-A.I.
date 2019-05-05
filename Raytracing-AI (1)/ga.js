function calcFitness() {
  for (let car of savedCars) {
    car.fitness = height - car.pos.y;
  }
}

function normFitness() {
  let total = 0;
  for (let car of savedCars) {
    total += car.fitness;
  }
  for (let car of savedCars) {
    car.fitness /= total;
  }
}

function nextGeneration() {
  const newPopulation = [];
  for (let i = 0; i < popSize; i++) {
    const parent = pickOne(savedCars);
    const child = parent.copy();
    child.mutate();
    newPopulation.push(child);
  }
  cars = newPopulation;
}

function mutate(matrix) {
  for (let i in matrix.data) {
    for (let j in matrix.data[i]) {
      if (random(1) < 0.01) {
        matrix.data[i][j] += randomGaussian();
      }
    }
  }

  return matrix;
}

function pickOne(list) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r = r - list[index].fitness;
    index++;
  }

  index--;
  return list[index];
}