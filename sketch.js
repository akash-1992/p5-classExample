let dragons;
let beat;
let distortion;
let myNoise;
let sample;
let fft;
let knobPosition;

function preload() {
  dragons = loadSound("https://cdn.jsdelivr.net/gh/processing/p5.js-website@master/src/data/examples/assets/lucky_dragons_-_power_melody.mp3"); 
  beat = loadSound("https://cdn.jsdelivr.net/gh/processing/p5.js-website@master/src/data/examples/assets/beat.mp3");

}

function setup() {
  createCanvas(256, 384);
  // try different sample
  sample = dragons;
  
  distortion = new p5.Distortion();
  sample.disconnect();
  distortion.process(sample, 0.01);
  distortion.amp(0.5);
  
  knobPosition = {
    x: map(0.01, 0, 0.5, 0, width),
    y: 320
  };
  
  let button = createButton("Toggle Sample");
  button.mousePressed(function() {
    if (sample.isPlaying()) {
      sample.stop(); 
    } else {
      sample.loop(); 
    }
  });
  
  fft = new p5.FFT(0.8, 256);
}


function draw() {
  background(0);
  let spectrum = fft.analyze();
  let waveform = fft.waveform();
  stroke("red");
  for(let i = 0; i < spectrum.length; i+=1) {
    line(i, 128, i, 128-(spectrum[i]/2)); 
  }
  
  stroke("blue");
  for (let i = 0; i < waveform.length; i +=1) {
    let sampleHeight = map(waveform[i], -1, 1, -64, 64);
    line(i, 192, i, 192 + sampleHeight);
  }
  
  
  if (mouseIsPressed && mouseY > 256 && mouseY < height) {
    let amount = constrain(map(mouseX, 0, width, 0, 0.5), 0, 0.5);
    knobPosition = {
      x: mouseX,
      y: 320
    }
    distortion.set(amount);
  }
  
  stroke("black");
  fill("white");
  ellipse(knobPosition.x, knobPosition.y, 20);
  
}
