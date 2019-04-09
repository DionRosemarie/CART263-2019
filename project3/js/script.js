"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// center point
let centerX = 0.0, centerY = 0.0;

let radius = 45, rotAngle = -90;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0009, damping = 0.98;

//corner nodes
let nodes = 8;

//zero fill arrays
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// soft-body dynamics
let organicConstant = 100.0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //center shape in window
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;

  //initialize arrays to 0
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeY[i] = 0;
    nodeY[i] = 0;
    angle[i] = 0;
  }

  // iniitalize frequencies for corner nodes
  for (let i = 0; i < nodes; i++){
    frequency[i] = random(5, 12);
  }

  noStroke();
  frameRate(30);
}

function draw() {
  //fade background
  fill(0, 100);
  rect(0, 0, width, height);
  drawShape();
  moveShape();
}

function drawShape() {
  //  calculate node  starting locations
  for (let i = 0; i < nodes; i++){
    nodeStartX[i] = centerX + cos(radians(rotAngle)) * radius;
    nodeStartY[i] = centerY + sin(radians(rotAngle)) * radius;
    rotAngle += 360.0 / nodes;
  }

  // draw polygon
  curveTightness(organicConstant);
  fill(0);
  stroke(255);
  beginShape();
let spacing = map(mouseX, 0, width, 5, 100);
for (let a = 0; a< 360; a+= spacing){
  let x = 200 * sin(a) +300;
  let y = 200 * cos(a) +300;
  vertex(x,y)
}
endShape(CLOSE);
}

function moveShape() {

  // create springing effect
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // move predator's center
  centerX += accelX;
  centerY += accelY;

  // slow down springing
  accelX *= damping;
  accelY *= damping;

  // change curve tightness
  organicConstant = 1 - ((abs(accelX) + abs(accelY)) * 0.1);

  //move nodes
  for (let i = 0; i < nodes; i++){
    nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * (accelX * 2);
    nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * (accelY * 2);
    angle[i] += frequency[i];
  }

  if (mouseIsPressed) {
nodes += 4;
console.log(nodes);
} else {
  nodes = 8;
}
}


/* function setup() {
console.log();
textAnimation();
$('.show').click(second);
$('#second').hide();
}

function textAnimation() {
   $('.title').textillate({
      in : {
           effect:'fadeIn',
           delay: 200,
       },
       out: {
           effect: 'fadeOut'
       },
       loop: false,
       minDisplayTime: 5000,

   });
};

function second() {
  console.log('there');
  $('.title').hide();
  $('.show').hide();
  $('#second').show();

}*/
