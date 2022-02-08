let X = 1;
let Y = 2;
let b1, b2, c1, c2;

var particlesQuantity = 4000;

var positionX = new Array(particlesQuantity);
var positionY = new Array(particlesQuantity);
var velocityX = new Array(particlesQuantity).fill(0);
var velocityY = new Array(particlesQuantity).fill(0);






function setup() {
    createCanvas(1920, 1080);

    //Colors 
    col1 = color(0);
    col2 = color(255);


    for (var particle = 1; particle < particlesQuantity; particle++) {
        positionX[particle] = random(0, width);
        positionY[particle] = random(0, height);
    }

    positionX[0] = 0;
    positionY[0] = 0;
}

function draw() {
    frameRate(30);
    background(0);


    strokeWeight(3);
    stroke(64, 255, 255);
    velocityX[0] = velocityX[0] * 0.5 + (mouseX - positionX[0]) * 0.1;
    velocityY[0] = velocityY[0] * 0.5 + (mouseY - positionY[0]) * 0.1;

    positionX[0] += velocityX[0];
    positionY[0] += velocityY[0];

    for (var particle = 1; particle < particlesQuantity; particle++) {
        var whatever = 1024 / (sq(positionX[0] - positionX[particle]) + sq(positionY[0] - positionY[particle]));

        velocityX[particle] = velocityX[particle] * 0.95 + (velocityX[0] - velocityX[particle]) * whatever;
        velocityY[particle] = velocityY[particle] * 0.95 + (velocityY[0] - velocityY[particle]) * whatever;

        positionX[particle] += velocityX[particle];
        positionY[particle] += velocityY[particle];

        if ((positionX[particle] < 0 && velocityX[particle] < 0) || (positionX[particle] > width && velocityX[particle] > 0)) {
            velocityX[particle] = -velocityX[particle];
        }

        if ((positionY[particle] < 0 && velocityY[particle] < 0) || (positionY[particle] > height && velocityY[particle] > 0)) {
            velocityY[particle] = -velocityY[particle];
        }

        point(positionX[particle], positionY[particle]);
    }






    radialGradient(mouseX, mouseY, 0, 2 * width / 7, 2 * height, col2, col1);
    //textStyle(BOLD);
    textSize(80);
    fill(0);
    text('Hello World', width / 2 - 300, height / 2);
}

function radialGradient(x, y, start, w, h, c1, c2) {
    noFill();

    //Ending at the starting point+width 
    for (let i = start; i <= w; i++) {

        //Mapping i to a new range of 0-1
        let inter = map(i, start, w, 0, 1.5);

        //lerpColor(color1, color2, amt) - blends two colors and finds the color between them 
        //amt - number between 0-1, the amount to interpolate between the two colors 
        let c = lerpColor(c1, c2, inter);

        //Drawing a line with that color 
        stroke(c);
        ellipse(x, y, i, i);
        //drawingContext.filter = 'blur(0.5px)';
    }
}


function mousePressed() {
    for (var particle = 1; particle < particlesQuantity; particle++) {
        positionX[particle] = random(0, width);
        positionY[particle] = random(0, height);
    }
}