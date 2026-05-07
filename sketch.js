let sourceImg;
let sampleBuffer;
let brushCount = 140;
let strokeScale = 6;

function preload() {
  sourceImg = loadImage("my_painting.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CORNER);
  noFill();
  strokeCap(ROUND);
  strokeJoin(ROUND);

  sampleBuffer = createGraphics(sourceImg.width, sourceImg.height);
  sampleBuffer.image(sourceImg, 0, 0);

  drawBaseImage();
  background(0);
}

function draw() {
  push();
  translate(width / 2, height / 2);

  const fit = min(width / sourceImg.width, height / sourceImg.height);
  scale(fit);

  // Center drawing in image coordinates.
  translate(-sourceImg.width / 2, -sourceImg.height / 2);

  for (let i = 0; i < brushCount; i += 1) {
    paintStroke();
  }

  pop();
}

function drawBaseImage() {

  push();
  translate(width / 2, height / 2);
  const fit = min(width / sourceImg.width, height / sourceImg.height);
  scale(fit);
  translate(-sourceImg.width / 2, -sourceImg.height / 2);
  image(sourceImg, 0, 0);
  pop();
}

function paintStroke() {
  const x = random(sourceImg.width);
  const y = random(sourceImg.height);
  const c = sampleBuffer.get(x, y);

  const baseAngle =
    noise(x * 0.007, y * 0.007, frameCount * 0.006) * TWO_PI * 2.0;
  const len = random(strokeScale * 0.5, strokeScale * 2.2);
  const wobble = sin(frameCount * 0.03 + x * 0.01 + y * 0.01) * 0.8;
  const angle = baseAngle + wobble;

  const x2 = x + cos(angle) * len;
  const y2 = y + sin(angle) * len;

  stroke(c[0], c[1], c[2], 128);
  strokeWeight(random(0.6, 2.2));
  line(x, y, x2, y2);

  // A small highlight line adds a painterly texture.
  stroke(255, 30);
  strokeWeight(0.8);
  line(x + 0.6, y + 0.6, x2 + 0.6, y2 + 0.6);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawBaseImage();
}
