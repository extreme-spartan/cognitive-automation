var socket;

var hname = location.protocol+'//'+ location.host;
// alert(hname);

let fingers;

var canvas;

var cnv;

var nText = '';

var aText = [];

var iUrl = '';

let ig; // Declare variable 'img'.

var mCX = '';

var mCY = '';

var Sc = 'black';

var Ss = '1';

var Shp = '';

var Cd = 0;

var Fc = 'black';

let ds;

var Ts=24;
let detectedOject = ''; 
let mobilenet;
let label1 = '';

// let puffin;
let video2;
// let img;
let detector;
let detections = [];

// function preload(){
//  // img = loadImage('./public/images/dogcat.jpeg');
//  detector = ml5.objectDetector('cocossd');
// }

// function modelReady(){
//  console.log('Model is ready!!')
//  mobilenet.predict(gotResults);
// }

// function imageReady(){
//  console.log('Image is ready!!')
//  image(puffin, 0, 0);
// }

function gotResults(error, results){
    if(error){
        console.error(error);
    } else {
        // console.log(results);

        detections = results;
        detector.detect(video2, gotResults);
        // label1 = results[0].label;
        // // let conf = results[0].confidence;

        // // createP(label1);
        // // createP(conf);
        // mobilenet.predict(gotResults);
    }
}
// Function to perform TensorFlow.js object detection
function detectObjects() {
    // Your TensorFlow.js code for object detection goes here
    // Example:
    // const model = await cocoSsd.load(); // Assuming cocoSsd is your COCO-SSD model
    
    detector = ml5.objectDetector('cocossd');
    
    // const predictions = await detector.detect(video2);
    // Further processing based on predictions
    // console.log(predictions);
}
function setup(){
    // alert('setup');
    canvas = createCanvas(windowWidth,windowHeight);    
    video2 = createCapture(VIDEO);
    video2.id("spn");
    video2.size(640, 480);
    video2.hide();
    // Assuming you have a video element with an id of 'yourVideoElementId'
    var video3 = document.getElementById('spn');

    // Wait for the 'loadeddata' event before performing TensorFlow.js operations
    video3.addEventListener('loadeddata', function() {
        // Perform TensorFlow.js operations on the video here
        detectObjects(); 
        detector.detect(video2, gotResults);    
        // Call your object detection function, for example
    });
    
    // console.log(detector);
    // image(img, 0, 0);
    // detector.detect(img, gotResults);
    
    // puffin = createImg('./public/images/fire.jpeg', imageReady )
    
    // background(255);
    // video2.hide();   
    // mobilenet = ml5.imageClassifier('MobileNet', video, modelReady)
    // fingers = createVideo(['assets/LittleRedRidingHood_video.mp4']);
    // fingers.hide();
    // socket = io.connect(hname);
    // socket.on('mouse', newDrawing);
    // socket.on('vid', newText);
    // p5eg();
    // ds = new PenroseLSystem();
    // //please, play around with the following line
    // ds.simulate(5);

}


function draw() {
    if (Shp == "detect") {
        image(video2, 0, 0);
        fill(255);
        textSize(34);
        for (let i=0; i < detections.length; i++){
            let object = detections[i];
            stroke(0,255,0);
            strokeWeight(4);
            noFill();
            rect(object.x, object.y, object.width, object.height)
            noStroke();
            fill(255);
            textSize(24);
            text(object.label, object.x+10, object.y+10 );
            if(object.label != detectedOject){
                historyArea.value += object.label + '\n';
                historyArea.scrollTop = historyArea.scrollHeight;
                detectedOject = object.label;
            }
        }
    }

    if (Shp == "text") {
        text(Cd, mCX, mCY, windowWidth - 80, 480);
    }
    if (Shp == "onload") {
        textSize(40);
        // fill(255,0,55);
        stroke(0);
        // image('/public/images/thumbnail.jpeg', 25, 220, 350, 250);
        // loadImage('/public/images/thumbnail.jpeg', img => {
        //  image(img, 25, 220, 350, 250);
        // });
        // fill(Fc);
        strokeWeight(3);
        fill('');
        // stroke(Cyan);
        // text("With Extreme-Spartan", 450,  90);
        // text("Cognitive Solutions", 430,  500);
        // text("Welcome to the World of Cognitive Computing!", 150,  40);
        // background(255);
        // responsiveVoice.speak("Welcome to the World of Cognitive Computing!");
        strokeWeight(1);
        // ds.render();
        // alert('onload')
        Shp = "";
    }   
    if (Shp == "intro") {
        textSize(40);
        // fill(255,0,55);
        stroke(3);
        loadImage('/public/images/thumbnail.jpeg', img => {
            image(img, 25, 220);
        });
        // fill(Fc);
        strokeWeight(3);
        fill('');
        // stroke(Cyan);
        // text(Cd, 350,  90);
        text("Cognitive Solutions", 338,  500);

        // background(255);
        // strokeWeight(1);
        // ds.render();
    }

}


// function setup() {
//   createCanvas(710, 400);
//   ds = new PenroseLSystem();
//   //please, play around with the following line
//   ds.simulate(5);
// }

// function draw() {
//   background(255);
//   ds.render();
// }

// class PenroseLSystem {
//  constructor() {
//      this.steps = 0;

//      //these are axiom and rules for the penrose rhombus l-system
//      //a reference would be cool, but I couldn't find a good one
//      this.axiom = "[X]++[X]++[X]++[X]++[X]";
//      this.ruleW = "YF++ZF----XF[-YF----WF]++";
//      this.ruleX = "+YF--ZF[---WF--XF]+";
//      this.ruleY = "-WF++XF[+++YF++ZF]-";
//      this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

//      //please play around with the following two lines
//      this.startLength = 460.0;
//      this.theta = TWO_PI / 10.0; //36 degrees, try TWO_PI / 6.0, ...
//      this.reset();
//  }
//  simulate(gen) {
//      while (this.getAge() < gen) {
//          this.iterate(this.production);
//      }
//  }
//  reset() {
//      this.production = this.axiom;
//      this.drawLength = this.startLength;
//      this.generations = 0;
//  }
//  getAge() {
//      return this.generations;
//  }
//  //apply substitution rules to create new iteration of production string
//  iterate() {
//      let newProduction = "";

//      for (let i = 0; i < this.production.length; ++i) {
//          let step = this.production.charAt(i);
//          //if current character is 'W', replace current character
//          //by corresponding rule
//          if (step == 'W') {
//              newProduction = newProduction + this.ruleW;
//          }
//          else if (step == 'X') {
//              newProduction = newProduction + this.ruleX;
//          }
//          else if (step == 'Y') {
//              newProduction = newProduction + this.ruleY;
//          }
//          else if (step == 'Z') {
//              newProduction = newProduction + this.ruleZ;
//          }
//          else {
//              //drop all 'F' characters, don't touch other
//              //characters (i.e. '+', '-', '[', ']'
//              if (step != 'F') {
//                  newProduction = newProduction + step;
//              }
//          }
//      }

//      this.drawLength = this.drawLength * 0.5;
//      this.generations++;
//      this.production = newProduction;
//  }
//  //convert production string to a turtle graphic
//  render() {
//      translate(width / 2, height / 2);

//      this.steps += 20;
//      if (this.steps > this.production.length) {
//          this.steps = this.production.length;
//      }

//      for (let i = 0; i < this.steps; ++i) {
//          let step = this.production.charAt(i);

//          //'W', 'X', 'Y', 'Z' symbols don't actually correspond to a turtle action
//          if (step == 'F') {
//              stroke(0, 60);
//              for (let j = 0; j < this.repeats; j++) {
//                  line(0, 0, 0, -this.drawLength);
//                  noFill();
//                  translate(0, -this.drawLength);
//              }
//              this.repeats = 1;
//          }
//          else if (step == '+') {
//              rotate(this.theta);
//          }
//          else if (step == '-') {
//              rotate(-this.theta);
//          }
//          else if (step == '[') {
//              push();
//          }
//          else if (step == ']') {
//              pop();
//          }
//      }
//  }
// }








function newDrawing(data){
    noStroke();
    fill(Fc);
    //ellipse(data.x, data.y, 16, 16);
    stroke(Sc);
    strokeWeight(Ss);
    //circle(mouseX, mouseY, 1, 1);
    // line(data.x, data.y, data.px, data.py);  
}


function newText(vdata){

    fill(255,0,55);
    textSize(24);

    stroke('black');
    strokeWeight(Ss);
    nText = vdata.vid;
    fill(Fc);
    rect(15, 20, windowWidth - 340, windowHeight - 120);
    fill(Fc);
    text(vdata.vid, 20, 25, windowWidth - 360, 400);
    //responsiveVoice.speak(vdata.vid);

    historyArea.value += vdata.vid + "\n";                 
    historyArea.scrollTop = historyArea.scrollHeight;   
    var extension = vdata.vrl.substr((vdata.vrl.lastIndexOf('.') +1));

    if (extension === 'mp4'){
        fingers = createVideo([vdata.vrl]);
     //fingers.hide();      

     fingers.loop();

     // filter(GRAY);
     // image(fingers, 150, 150);
    } else {
    //text(vdata.vid, 10, 10, 600, 400);
    //ig = loadImage(vdata.vrl);
        fill(255);
        //rect(15, 200, windowWidth - 340, 300);
        loadImage(vdata.vrl, img => {
            image(img, 25, 220, 350, 250);
        });

    }
     if (nText == 'square'){
        stroke(Sc);
        strokeWeight(Ss);
        noFill();
        square(100, 120, 255);
     } else if (nText == 'rectangle'){
        stroke(Sc);
        strokeWeight(Ss);
        rect(330, 200, 105, 155);
     } else if (nText == 'clear'){
        clear();
     }
    
}

function mouseDragged(){
    console.log('Sending: '+ mouseX +',' + mouseY);
    var data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY
    }
    // socket.emit('mouse', data);
    //fill(255, 0, 100);
    // circle(mouseX, mouseY, 36, 36);
    stroke(Sc);
    strokeWeight(Ss);
    fill(Fc);


    if (Shp == "scribble") {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
    if (Shp == "circle") {
        circle(mouseX, mouseY, Cd);
    }
    if (Shp == "square") {
        square(mouseX, mouseY, Cd);
    }

}
window.onresize = function() {
//   canvas.size(windowWidth - 300, windowHeight - 100);
  //background(51)
};


function mousePressed() {
    // alert(s)
    
    fill(255,0,55);
    textSize(12);
    stroke(Sc);
    fill(Fc);
    strokeWeight(Ss);

    mCX = mouseX;
    mCY = mouseY;
    var cxy = mCX+' '+mCY;
    if (Shp == "line") {
        noFill();
        circle(mCX, mCY, 20);
        circle(mouseX, mouseY, 20);

        fill(Fc)
        // line(mCX, mCY, mRX, mRY);
        circle(mouseX, mouseY, 10);
        circle(mCX, mCY, 10);
    }
    if (Shp == "text") {
        text(Cd, mouseX, mouseY, windowWidth - 380, 480);
    }
    // alert(cxy);
    //text(cxy, mouseX, mouseY, windowWidth - 380, 480);
    // circle(mouseX, mouseY, 45);
    var vdata = {
        vid: nText
    }

  //fingers.loop(); // set the video to loop and start playing
}

function mouseReleased() {
    mRX = mouseX;
    mRY = mouseY;
    var crxy = mRX+' '+mRY;
    // alert(crxy);
    //fill(255,0,55);
    textSize(12);   
    stroke(Sc);
    strokeWeight(Ss);
    var cxy = mouseX+' '+mouseY;


    if (Shp == "circle") {
        circle(mouseX, mouseY, Cd);
    }
    if (Shp == "square") {
        square(mouseX, mouseY, Cd);
    }
    if (Shp == "line") {
        // noFill();
        // circle(mCX, mCY, 20);
        // circle(mouseX, mouseY, 20);

        fill(Fc)
        line(mCX, mCY, mRX, mRY);
        // circle(mouseX, mouseY, 10);
        // circle(mCX, mCY, 10);
    }
    // //text(cxy, mouseX, mouseY, windowWidth - 380, 480);

    // text(uname, mouseX, mouseY, windowWidth - 380, 480);
    //stroke('blue');
    //strokeWeight(2);
    //line(pmouseX, pmouseY, mCX, mCY);

    // line(mCX, mCY, mRX, mRY);

    var vdata = {
        vid: nText
    }
    //circle(mouseX, mouseY, 20);
    //socket.emit('vid', vdata);

    function narrateText(nText, iUrl) {

        fill(255,0,55);
        textSize(24);
    
        stroke('white');
        strokeWeight(1);
        //noFill();
        fill(255);
        rect(10, 15, windowWidth - 325, windowHeight - 120);
        fill(255,0,55);
         text(nText, 18, 25, windowWidth - 360, 400);
         // responsiveVoice.speak(nText);
        rl = hname +'/protected/KathaCms'+iUrl;
        //rl = 'http://localhost:3000/KathaCms/content/topic/showjackets.jpg'
        var extension = iUrl.substr((iUrl.lastIndexOf('.') +1));
        if (extension === 'mp4'){
              fingers = createVideo([rl]);
         //fingers.hide();      
    
          fingers.play();
    
          // filter(GRAY);
          // image(fingers, 150, 150);
        } else {
            fill(255);
        //rect(15, 200, windowWidth - 340, 300);
          loadImage(rl, img => {
            image(img, 25, 220, 350, 250);
          });
        }
         if (nText == 'square'){
             stroke(Sc);
            strokeWeight(2);
            noFill();
            square(100, 120, 255);
         } else if (nText == 'rectangle'){
             stroke('green');
            strokeWeight(2);
             rect(330, 200, 105, 155);
         } else if (nText == 'clear'){
             clear();
         }
    
        var vdata = {
            vid: nText,
            vrl: rl
        }
        //circle(mouseX, mouseY, 20);
        // socket.emit('vid', vdata);
    
    }

  //fingers.loop(); // set the video to loop and start playing
}
