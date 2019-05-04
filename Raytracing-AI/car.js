class Car {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -1);
    this.acc = createVector(0, 0);
    this.mass = m;

    this.maxSpeed = 5;
    this.maxForce = .5;
  }

  look(path) {
    const rays = [
      new Ray(this.pos, PI/4),
      new Ray(this.pos, 3*PI/4),
      new Ray(this.pos, 5*PI/4),
      new Ray(this.pos, 7*PI/4),
    ];

    const walls = path.boundaries();

    for (let ray of rays) {
      //let closest = null;
      //let record = 0;
      const pt = ray.look(walls);
      //const pt = ray.look(walls);
      line(ray.pos.x, ray.pos.y, pt.x, pt.y);
      //ray.render();
    }
  }

  seek(target) {
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
    fill(255, 0, 0);
    stroke(0);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 48, 24);
    pop();
  }
}
