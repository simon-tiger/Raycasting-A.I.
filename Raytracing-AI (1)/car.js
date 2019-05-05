class Car {
  constructor(x, y, m, brain) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -1);
    this.acc = createVector(0, 0);
    this.mass = m;

    this.target = null;
    this.maxSpeed = 5;
    this.maxForce = .3;

    if (this.brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(10, 10, 2);
    }
  }

  think(path) {
    const view = this.look(path);

    const inputs = [
      this.pos.x/width,
      this.pos.y/height,
      view[0].x/width,
      view[0].y/height,
      view[1].x/width,
      view[1].y/height,
      view[2].x/width,
      view[2].y/height,
      view[3].x/width,
      view[3].y/height
    ]

    const outputs = this.brain.predict(inputs);
    const target = createVector(outputs[0]*width, outputs[1]*height);
    this.applyForce(this.seek(target));
  }

  isDead(path) {
    const view = this.look(path);

    for (let pt of view) {
      if (!pt) {
        return true;
      }
    }

    return false;
  }

  copy() {
    return new Car(width/2 + random(-72, 72), height-48, this.mass, this.brain);
  }

  mutate() {
    this.brain.mutate(mutate);
  }

  look(path) {
    const rays = [
      new Ray(this.pos, PI/4),
      new Ray(this.pos, 3*PI/4),
      new Ray(this.pos, 5*PI/4),
      new Ray(this.pos, 7*PI/4),
    ];

    const walls = path.boundaries();
    const result = [];

    for (let ray of rays) {
      const pt = ray.look(walls);
      result.push(pt);
      //if (pt) {
      //  line(ray.pos.x, ray.pos.y, pt.x, pt.y);
      //}
    }

    return result;
  }

  seek(target) {
    this.target = target;

    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    const steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    return steering;
  }

  applyForce(force) {
    const f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  render() {
    push();
    stroke(255);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.target.x, this.target.y);
    strokeWeight(2);
    stroke(0, 255, 0);
    line(this.target.x-8, this.target.y, this.target.x+8, this.target.y);
    line(this.target.x, this.target.y-8, this.target.x, this.target.y+8);
    pop();

    push();
    fill(255, 0, 0);
    stroke(0);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 48, 24);
    pop();
  }
}
