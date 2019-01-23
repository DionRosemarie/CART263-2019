class Food {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = '#55cccc';
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.maxSpeed = 5;
    this.tx = 0;
    this.ty = 0;
  }

  update() {
    if (random() < 0.05) {
      this.vx = random(-this.maxSpeed, this.maxSpeed);
      this.vy = random(-this.maxSpeed, this.maxSpeed);

    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }

    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }

  }

  position() {
    this.x = random(0, width);
    this.y = random(0, height);
  }


  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
    pop();
  }

}
