class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  render() {
    push();
    stroke(255);
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 32, this.dir.y * 32);
    pop();
  }

  look(walls) {
    let closest = null;
    let record = 0;
    for (let wall of walls) {
      const pt = this.cast(wall);
      if (pt) {
        const distance = p5.Vector.dist(this.pos, pt);
        if (1/distance > record) {
          closest = pt;
          record = 1/distance;
        }
      }
    }

    return closest;
  }

  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return null;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (/*t > 0 && t < 1 &&*/ u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return null;
    }
  }
}