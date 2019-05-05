class Boundary {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  render() {
    stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
