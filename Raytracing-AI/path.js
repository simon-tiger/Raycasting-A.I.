class Path {
  constructor() {  }

  boundaries() {
    const left = [];
    const right = [];

    for (let i = 0; i < this.left.length-1; i++) {
      left.push(new Boundary(this.left[i], this.left[i+1]));
    }

    for (let i = 0; i < this.right.length-1; i++) {
      left.push(new Boundary(this.right[i], this.right[i+1]));
    }

    return left.concat(right)
  }

  render() {
    stroke(255);
    noFill();
    beginShape();
    for (let v of this.left) {
      vertex(v.x, v.y)
    }
    endShape();

    beginShape();
    for (let v of this.right) {
      vertex(v.x, v.y)
    }
    endShape();
  }
}