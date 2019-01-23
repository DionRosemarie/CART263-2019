class Avatar {
  constructor(x, y, size,maxSize) {
    this.x = 0;
    this.y = 0;
    this.maxSize = size;
    this.size = size;
    this.active = true;
    this.color = '#cccc55';
    this.sizeLoss = AVATAR_SIZE_LOSS;
    this.sizeGain = AVATAR_SIZE_GAIN;

  }

  update() {
    this.x = mouseX;
    this.y = mouseY;


    this.size = constrain(this.size - this.sizeLoss, 0, this.maxSize);
    if (this.size === 0) {
      this.active = false;
    }
  }

  checkCollision(food) {
    let d = dist(this.x, this.y, food.x, food.y);
    if (d < this.size / 2 + food.size / 2) {
    this.size = constrain(this.size + this.sizeGain, 0, this.maxSize);
    food.position();
    }

  }


  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
    pop();
  }

}
