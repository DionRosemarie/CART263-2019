"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let food = [];
let avatar;
const AVATAR_SIZE_GAIN = 50;
const AVATAR_SIZE_LOSS = 1;

function setup() {
  createCanvas(windowWidth,windowHeight);
  for (let i = 0; i < 10; i++) {
  food.push(new Food(0,0,random(0,20))); }
  avatar = new Avatar(0,0,30);

}

function draw() {
  background(0);

  if (!avatar.active) {
  return;
}

  for (let i = 0; i < food.length; i++) {
  food[i].update();
  food[i].display();
  avatar.checkCollision(food[i]);

  }

  avatar.update();
  avatar.display();

}
