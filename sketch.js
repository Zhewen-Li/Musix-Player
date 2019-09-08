/* NEW EXPERIENCE WITH MUSIC -- MUSIC FILTER plus DISPLAYER */
// Zhewen Li u6437091
// COMP 1720 Major Project 2018

/*declare variables */
var music1, music2, music3, music4, music5; // music
var drum1, drum2, drum3, drum4, drum5, drum6; // drum beats
var pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11; // pictures
var myFont1; // font
var showStyle, showIns, showTransition, showNext, chooseMusic, chooseStyle, start; // controller of each stage
var musicChosen1, musicChosen2, musicChosen3,  musicChosen4,  musicChosen5, styleChosen1,styleChosen2, styleChosen3, playing1, playing2, playing3; // determine which element was chosen
var selectedMusic, selectedStyle; // final selected music & style
var button1, button2, button3, button4, button5, button6, button7, button8, button9, button10, button11; // control buttons
var randomColor;

/*For music displayer */
var numSlices = 8, numPositions = 15, amplitude; // number of points for music displayer
var angle1 = 0, ang1;
var positions = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload() {
  // load any assets (images, sounds etc.) here
  music1 = loadSound('assets/music/Keepsake.mp3'); music2 = loadSound('assets/music/Little.mp3');
  music3 = loadSound('assets/music/Morning.mp3'); music4 = loadSound('assets/music/llinoisStride.mp3');
  music5 = loadSound('assets/music/Hawaii.mp3');

  drum1 = loadSound('assets/drum/HardKick.mp3'); drum2 = loadSound('assets/drum/BassHit.mp3');
  drum3 = loadSound('assets/drum/Snar1.mp3');    drum4 = loadSound('assets/drum/Snar2.mp3');
  drum5 = loadSound('assets/drum/Bloc.mp3');     drum6 = loadSound('assets/drum/Cymb.mp3');

  pic1 = loadImage('assets/pic/note1.png'); pic2 = loadImage('assets/pic/note2.png');
  pic3 = loadImage('assets/pic/note3.png'); pic4 = loadImage('assets/pic/note4.png');
  pic5 = loadImage('assets/pic/note5.png'); pic6 = loadImage('assets/pic/ins.png');
  pic7 = loadImage('assets/pic/note2_playing.png'); pic8 = loadImage('assets/pic/note3_playing.png'); 
  pic9 = loadImage('assets/pic/note4_playing.png'); pic10 = loadImage('assets/pic/notes.png');
  pic11 = loadImage('assets/pic/operation.png');

  myFont1 = loadFont('assets/myFont1.ttf');

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
    // any additional setup code goes here
    createCanvas(windowWidth, windowHeight);
    addButtons();
    addElements();

    // create new amplitude
    amplitude = new p5.Amplitude();

    // for generating points
    angleMode(DEGREES);
    ang1 = radians(angle1);

    textAlign(CENTER);
    imageMode(CENTER);
    textFont(myFont1);

    //set music volume
    music4.setVolume(0.5);
    music5.setVolume(0.5);
    
    // set default value for randomColor
    randomColor = random(255);

}

function addElements() {
    // set default value for showStyle, showIns
    start = false; showStyle = false; showIns = false; showTransition = false; showNext = false; chooseMusic = false; chooseStyle = false; 
    musicChosen1 = false; musicChosen2 = false; musicChosen3 = false; musicChosen4 = false; musicChosen5 = false;
    styleChosen1 = false; styleChosen2 = false; styleChosen3 = false;
    playing1 = false; palying2 = false; playing3 = false;
}

function addButtons() {
    /* buttons for choose music*/
    // create button 1
    button1 = createButton('Next');
    button1.position(width/6-width/50, height/4*3);
    button1.mousePressed(styleShowStart);
    button1.hide();

    // create button 2
    button2 = createButton('Next');
    button2.position(width/6*2-width/50, height/4*3);
    button2.mousePressed(styleShowStart);
    button2.hide();

    // create button 3
    button3 = createButton('Next');
    button3.position(width/2-width/50, height/4*3);
    button3.mousePressed(styleShowStart);
    button3.hide();

    // create button 10
    button10 = createButton('Next');
    button10.position(width/6*4-width/50, height/4*3);
    button10.mousePressed(styleShowStart);
    button10.hide();

    // create button 11
    button11 = createButton('Next');
    button11.position(width/6*5-width/50, height/4*3);
    button11.mousePressed(styleShowStart);
    button11.hide();



    /* buttons for choose style*/
    // buttons for return to style picker
    button4 = createButton('Back');
    button4.position(width/10*9, height/8*7);
    button4.mousePressed(backToPicker);
    button4.hide();

    // create button 5
    button5 = createButton('Next');
    button5.position(width/4-width/80, height/2+height/6);
    button5.mousePressed(startTransition);
    button5.hide();

    // create button 6
    button6 = createButton('Next');
    button6.position(width/2-width/80, height/2+height/6);
    button6.mousePressed(startTransition);
    button6.hide();

    // create button 7
    button7 = createButton('Next');
    button7.position(width/4*3-width/80, height/2+height/6);
    button7.mousePressed(startTransition);
    button7.hide();

    /* For transition part*/
    // create button 8
    button8 = createButton('Continue');
    button8.position(width/10*9, height/8*7);
    button8.mousePressed(nextPage);
    button8.hide();

    // create button 9
    button9 = createButton('Start');
    button9.position(width/10*9, height/8*7);
    button9.mousePressed(visualshowStyle);
    button9.hide();

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw() {
    // your "draw loop" code goes here
    background(0);
    if(start == true){
        // stage one: choose music starts
        if(chooseMusic == true && chooseStyle == false && showStyle == false && showTransition == false){
            clear();
            background(0);
            push();
            musicPicker();  
            pop();  
        }
        // stage two: choose displayer style starts
        if(chooseStyle == true && chooseMusic == false && showStyle == false && showTransition == false){
            clear();
            background(0);
            push();
            stylePicker();
            pop();
        }
        // show the instructions before start
        if(showTransition == true && chooseStyle == false && chooseMusic == false && showStyle == false){
            clear();
            background(0);
            push();
            transStart();
            pop();
        }
        // draw the displayer based on mouse operations
        if(showStyle == true && showTransition == false && chooseStyle == false && chooseMusic == false){
            clear();
            background(0);
            push();
            showStage();
            pop();
            instruction();
            reset();
        }

    }else{
        // draw the front page
        push();
        indexPage();
        introduction();
        pop();
        
    }
    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INDEX PAGE

function indexPage(){

    clear();
    background(0);
    push();

    /* title */
    // set color changing effect for title
    push();
    for(var i=0;i<2000;i+=3){
        if(frameCount >= 100*i && frameCount < 100*(i+1)){
            fill(frameCount%100, 40, 10);    
        }
        if(frameCount >= 100*(i+1) && frameCount < 100*(i+2)){
            fill(120, frameCount%100, 10);
        }
        if(frameCount >= 100*(i+2) && frameCount < 100*(i+3)){
            fill(120, 40, frameCount);
        }
    }

    textSize(80);
    stroke(250,200,130);
    strokeWeight(4);
    text('New Experience with Music',width/2, height/2);

    // set mouseOver effect on question mark
    if(mouseX>=width/5*4-width/30 && mouseX<=width/5*4+width/40 && mouseY>= height/2+width/30 && mouseY<= height/2+width/15){
        showIns = true;
    }else{
        showIns = false;
    }
    
    if(showIns == true){
        noTint();
        push();
        textSize(30);
        fill(100,100,100,90);
        noStroke();
        text('hold to see', width/5*4, height/2+height/6);
        pop();
    }else{
        tint(255,120);
    }
    
    image(pic6, width/5*4, height/2+height/10,width/30,width/30);
    pop();


    /* other text */
    // set filickering effect for the text "click anywhere to showStyle"
    push();
    for(var i=0;i<2000;i+=2){
        if(frameCount >= 50*i && frameCount < 50*(i+1)){
            stroke(200, 220, 200, (frameCount % 100)*2);
        }
        if(frameCount >= 50*(i+1) && frameCount < 50*(i+2)){
            stroke(200, 220, 200, 100 - (frameCount%50)*2);
        }
    }
    
    // instruction text "click anywhere to showStyle"
    strokeWeight(1);
    noFill();
    textSize(40);
    text('Click anywhere to start', width/2, height/5*4);
    pop();
    
    /* musical notes */
    // draw the staff    
    drawBezier(-20,-20,0);
    drawBezier(-15,-15,0);
    drawBezier(-10,-10,0);
    drawBezier(-5,-5,0);  
    drawBezier(0,0,0);

    push();
    stroke(125,95,105,80);
    strokeWeight(8);
    translate(-5,-8);
    line(width/2+width/15, height/10, width/2+width/10, height/3.75);
    pop();

    // draw the notes
    drawNotes(pic1, width/10, height/3, width/5, width/5, 255, 20, 60, -130);
    drawNotes(pic5, 7*(width/10), height/3-height/10,width/10/5*4,width/10/5*4, 150, 0, -50, -20);
    drawNotes(pic2, width/4, height/5, width/12, width/12, 180, 0, 0, 0);
    drawNotes(pic3, width/3, height/3+height/10, width/12, width/12, 180, -10, 0, 0);
    drawNotes(pic3, width/3+width/9, height/2-height/10, width/15, width/15, 180, -10, 0, 0);
    drawNotes(pic4, width/4*3, height/2-height/15, width/12, width/12, 180, -10, 0, 0);
    drawNotes(pic2, width/7*6, height/2-height/10, width/12, width/12, 180, -10, 0, 0);
    pop();
}

// index page decorations
function drawBezier(x,y,z){
    push();
    noFill();
    stroke(125,95,105,80);
    strokeWeight(1);
    rotate(z);
    scale(7.8);
    translate(x,y);
    bezier(20, 20, 60, 70, 150, 20, 265, 20);
    pop();

}

function drawNotes(pic, w, h, s1, s2, t, r, x, y){
    push();
    tint(255, t);
    rotate(r);
    translate(x, y);
    image(pic, w, h, s1, s2);
    pop();

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WORKSTATION

/* STAGE ONE: PICK MUSIC*/

function musicPicker(){
    push();
    clear();
    background(0);

    // add heading
    push();
    fill(120, 120, 120, 90);
    rect(0,0,width, height/6);
    textSize(40);
    fill(255, 90, 90);
    stroke(10,70,190);
    strokeWeight(5);
    text('Stage One :  Choose Music ', width/4, height/10);
    textSize(20);
    stroke(2);
    text('* ( Click on the notes to listen ) ', width/7*6, height/8);
    pop();


    // set mouseOver effect
    mouseOver();


    // set click-on effect --- which means current selected music
    if(musicChosen1 == true){
        button1.show();
        selectedMusic = music1;
        fill(100, 40, 120);
        mouseOverWhich(width/6, pic2, width/6, 'Music 1', width/6, height/2+height/6);
    }
    if(musicChosen2 == true){
        button2.show();
        selectedMusic = music2;
        fill(40, 120, 100);
        mouseOverWhich(width/6*2, pic3, width/6*2, 'Music 2', width/6*2, height/2+height/6);
    }
    if(musicChosen3 == true){
        button3.show();
        selectedMusic = music3; 
        fill(120, 100, 40);
        mouseOverWhich(width/2, pic4, width/2, 'Music 3', width/2, height/2+height/6);
    }
    if(musicChosen4 == true){
        button10.show();
        selectedMusic = music4; 
        fill(120, 100, 40);
        mouseOverWhich(width/6*4, pic2, width/6*4, 'Music 4', width/6*4, height/2+height/6);
    }
    if(musicChosen5 == true){
        button11.show();
        selectedMusic = music5; 
        fill(120, 100, 40);
        mouseOverWhich(width/6*5, pic3, width/6*5, 'Music 5', width/6*5, height/2+height/6);
    }

    // set playing effect for prelistening the music
    playingMode(music1, pic7, width/6, height/2);
    playingMode(music2, pic8, width/6*2, height/2);
    playingMode(music3, pic9, width/2, height/2);
    playingMode(music4, pic7, width/6*4, height/2);
    playingMode(music5, pic8, width/6*5, height/2);

    // graphic of notes
    push();
    tint(255,125);
    image(pic2, width/6, height/2, width/13, width/13);
    image(pic3, width/6*2, height/2, width/13, width/13);
    image(pic4, width/2, height/2, width/13, width/13);
    image(pic2, width/6*4, height/2, width/13, width/13);
    image(pic3, width/6*5, height/2, width/13, width/13);

    pop();

}

// mouse-over effect
function mouseOver(){
    if(mouseX>= width/6-width/20 && mouseX<= width/6+width/20){
        push();
        fill(100, 40, 120, 90);
        mouseOverWhich(width/6, pic2, width/6, 'Music 1', width/6, height/2+height/6);
        button1.show();
        button2.hide();
        button3.hide();
        button10.hide();
        button11.hide();
        pop();
    }
    if(mouseX>= width/6*2-width/20 && mouseX<= width/6*2+width/20){
        push();
        fill(40, 120, 100, 90);
        mouseOverWhich(width/6*2, pic3, width/6*2, 'Music 2', width/6*2, height/2+height/6);
        button2.show();
        button1.hide();
        button3.hide();
        button10.hide();
        button11.hide();
        pop();
    }
    if(mouseX>= width/2-width/20 && mouseX<= width/2+width/20){
        push();
        fill(120, 100, 40, 90);
        mouseOverWhich(width/2, pic4, width/2, 'Music 3', width/2, height/2+height/6);
        button3.show();
        button1.hide();
        button2.hide();
        button10.hide();
        button11.hide();
        pop();
    }
    if(mouseX>= width/6*4-width/20 && mouseX<= width/6*4+width/20){
        push();
        fill(120, 100, 40, 90);
        mouseOverWhich(width/6*4, pic2, width/6*4, 'Music 4', width/6*4, height/2+height/6);
        button10.show();
        button1.hide();
        button2.hide();
        button3.hide();
        button11.hide();
        pop();
    }
    if(mouseX>= width/6*5-width/20 && mouseX<= width/6*5+width/20){
        push();
        fill(120, 100, 40, 90);
        mouseOverWhich(width/6*5, pic3, width/6*5, 'Music 5', width/6*5, height/2+height/6);
        button11.show();
        button1.hide();
        button2.hide();
        button10.hide();
        button3.hide();
        pop();
    }
}

 // effect for each button
function mouseOverWhich(x, pic, picX, set1, set2, set3){
    push();
    rectMode(CENTER);
    rect(x, height/2+height/6, width/10, height);
    noTint();
    image(pic, picX, height/2, width/13, width/13);
    setText(set1, set2, set3);
    pop();

}

// set text for each note
function setText(t, x, y ){
    push();
    textSize(30);
    fill(200, 220, 60);
    stroke(100,110,213);
    strokeWeight(5);
    text(t, x, y);
    pop();
}

// set playing effect for each note
function playingMode(x, pic, picX, picY){
    if(x.isPlaying()){
        push();
        image(pic, picX, picY, width/13, width/13);
        rectMode(CENTER);
        noFill();
        stroke(200,210,213,90);
        strokeWeight(5);
        translate(picX, picY);
        rotate(frameCount / 2.0);
        rect(0, 0, width/13, width/13, 10, 10);
        pop();
    }
}

// set stage2 start( FOR BUTTON 1-3 )
function styleShowStart(){
    chooseStyle = true;
    chooseMusic = false;
    music1.stop();
    music2.stop();
    music3.stop();
    music4.stop();
    music5.stop();
    button1.hide();  
    button2.hide();  
    button3.hide();
    button10.hide();
    button11.hide();
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

/* STAGE TWO: PICK STYLE FOR VISUALIZATION*/

function stylePicker(){ 
    push();
    clear();
    background(0);
    pop();

    // add heading
    push();
    fill(120, 120, 120, 90);
    rect(0,0,width, height/6);
    textSize(40);
    fill(255, 90, 90);
    stroke(10,70,190);
    strokeWeight(5);
    text('Stage Two :  Choose Visualization Style ', width/4+width/20, height/10);
    textSize(20);
    stroke(2);
    text('* ( Click on the play button to see the style  ) ', width/7*6, height/8);
    pop();
    
    // button of each style
    push();
    fill(180,180,180,90);
    ellipse(width/4, height/2, width/8,width/8);
    ellipse(width/2, height/2, width/8,width/8);
    ellipse(width/4*3, height/2, width/8,width/8);
    pop();

    // set mouse-over effect
    mouseOverStyle();

    // set click-on effect for displaying style
    if(playing1 == true){
        generateStyle(1);
        button4.show();
    }
    if(playing2 == true){
        generateStyle(2);
        button4.show();
    }
    if(playing3 == true){
        generateStyle(3);
        button4.show();
    }

    // set click-on effect -- which means current selected style
    if(styleChosen1 == true){
        selectedStyle = 1;
        findStyle(width/4, 'Style 1');
        button5.show(); 
        button6.hide(); 
        button7.hide();
    }
    if(styleChosen2 == true){
        selectedStyle = 2;
        findStyle(width/2, 'Style 2');
        button6.show(); 
        button5.hide(); 
        button7.hide();
    }
    if(styleChosen3 == true){
        selectedStyle = 3;
        findStyle(width/4*3, 'Style 3');
        button7.show(); 
        button5.hide(); 
        button6.hide();
    }


}

// mouse-over effect
function mouseOverStyle(){
    if(mouseX>=width/4-width/16 && mouseX<=width/4+width/16){
        findStyle(width/4, 'Style 1');
    }
    if(mouseX>=width/2-width/16 && mouseX<=width/2+width/16){
        findStyle(width/2, 'Style 2');
    }
    if(mouseX>=width/4*3-width/16 && mouseX<=width/4*3+width/16){  
        findStyle(width/4*3, 'Style 3');
    }
}

// effect for each button
function findStyle(x, t){
    push();
    fill(180,180,180);
    stroke(20,70,180);
    strokeWeight(8);
    ellipse(x, height/2, width/8,width/8);
    pop();
    textSize(30);
    fill(30, 280, 220);
    text(t, x, height/2); 
    rectMode(CENTER); 
    rect(x, height/2+height/20, width/50, width/50) ;
    fill(230, 40, 120);
    triangle(x-width/200, height/2+height/20-width/150, x-width/200, height/2+height/20+width/150, x+width/150, height/2+height/20);

}

// control whether display style effect or not ( FOR BUTTON 4 )
function backToPicker(){
    playing1 = false; 
    playing2 = false; 
    playing3 = false;
    button4.hide();
}

// start transition page( FOR BUTTON 5-7 )
function startTransition(){
    showTransition = true;
    chooseMusic = false;
    chooseStyle = false;
    button5.hide(); 
    button6.hide(); 
    button7.hide();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TRANSITION PAGE


// show instructions before start
function transStart(){
    image(pic10, width/2, height/2);
    button8.show();

    if(showNext == true){
        clear();
        background(0);
        showIns2();
    }
    
}

// (FOR BUTTON 8)
function nextPage(){
    showNext = true;
}

function showIns2(){
    button8.hide();
    //
    strokeWeight(5);
    textSize(60);
    fill(90, 100, 50);
    stroke(220, 200, 180);   
    text("Now, Let's start combining them together", width/3, height/2.5); 

    // 
    fill(random(255), random(255), random(255));
    stroke(120, 100, 180);
    text('Enjoy your unique music displayer ! ', width/3*2, height/1.5);

    button9.show();
}

// music visualization start ( FOR BUTTON 9 )
function visualshowStyle(){
    showStyle = true;
    showTransition = false; 
    chooseMusic = false; 
    chooseStyle = false; 
    button9.hide();
    button4.hide();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MUSIC DISPLAYER


// show generating points with music effect based on key operations
function showStage(){
    clear();
    background(0);
    generateStyle(selectedStyle);   
}

// find which diplayer style to show
function generateStyle(gStyle){
    var n = amplitude.getLevel();
    if(gStyle == 1){ // style 1
        push();
            generatePoints(width/2 + (400 * cos(ang1)), height*0.5 - 10);
            ang1 += 2;
            pop();
    }
    if(gStyle == 2){ // style 2
        push();
        generatePoints(height*0.5 + 300, width/2 + (200 * cos(ang1)));
        ang1 += 10;
        pop();
    }
    if(gStyle == 3){ // style 3
        push();
        generatePoints(mouseX, mouseY);
        pop();
    }  

}

function generatePoints(x,y){
    // Add the latest position to the array    
    positions.unshift({ x: x, y: y  });

    // Only store the latest `numPositions` positions
    positions.splice(numPositions, 100);
    translate(width/2, height/2);
    background(0);

    // For each slice
    for (var i = 0; i < numSlices; i++) {
        drawPoints(positions);
        rotate(360 / numSlices);
    }
    
}

function drawPoints(xs) {
    for (var i = xs.length - 1; i >= 0; i--) {
        var level = amplitude.getLevel();
        var size = map(level, 0, 1, 0, 200);
        var positions = xs[i];
    
        var x = positions.x;
        var y = positions.y;
           
        fill( (mouseX / width) * 255, (mouseY / height)*255, 125, 255 * (1 - i / numPositions));
        stroke((mouseX / width) * 255, (mouseY / height)*255, 125 * (1 - i / numPositions));
        strokeWeight(1);

        if(key == 'q' || key == 'e' || key == 't'){
            rect(x-width/2, y-height/2, 4*size, 4*size);
        }else{
            ellipse(x-width/2, y-height/2, 4*size, 4*size);
        }
        
    
        stroke((mouseY / height) * 255, (mouseX / width)*255, 125, 255 * (1 - i / numPositions));
        strokeWeight(5);
        noFill();

        if(key == 'q' || key == 'e' || key == 't'){
            rect(y-height/2, x-width/2, 3*size, 3*size);
        }else{
            ellipse(y-height/2, x-width/2, 3*size, 3*size);
        }

    } 

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ABOUT THIS GAME

function introduction(){
    push();
    if(mouseX>=width/5*4-width/30 && mouseX<=width/5*4+width/40 && mouseY>= height/2+width/30 && mouseY<= height/2+width/15){
        if(mouseIsPressed){
             // clear background elements
            clear();
            background(0);

            // set default format for text
            fill(250,250,250,80);
            stroke(180,180,230,95);
            strokeWeight(15);
            rect(width/6, height/8, width/3*2, height/5*4);
            fill(120,40,230);

            // headline
            push();
            fill(100, 100, 230);
            stroke(200, 180, 60);
            strokeWeight(5);
            textSize(70);
            text('About This Game', (width/3*2-width/6)/2+width/4, height/8+height/10);
            pop();

            // sub-heading
            push();
            fill(60,124,133);
            stroke(200,180,120);
            strokeWeight(5);
            textSize(40);
            text('Theme :  New', width/4, height/8+height/5.5);
            text('What Is It ? ', width/4, height/8+height/3.5);
            text('What Can You Do ? ', width/3.6, height/8+height/2.7);
            text('Process Description : ', width/3.6, height/8+height/2.2);
            pop();

            // content
            push();
            stroke(200,180,20);
            strokeWeight(3);
            textSize(30);
            textAlign(LEFT);
            text('----  A New Type Of Music Experience', width/3, height/8+height/5.5);
            text('----  A Music Mixer & A Music Visualization ( Displayer )', width/3, height/8+height/3.5);
            text('----  Add sound effects & Generate music visualization', width/2-width/10, height/8+height/3.5+height/12);
            text('Stage One : ', width/4-width/30, height/8+height/3.5+height/12+height/6);
            text('Choose music from the given board', width/3, height/8+height/3.5+height/12+height/6);
            text('Stage Two : ', width/4-width/30, height/8+height/3.5+height/12+height/4.5);
            text('Choose displayer style from the given board',  width/3, height/8+height/3.5+height/12+height/4.5);
            text('Stage Three : ', width/4-width/30, height/8+height/3.5+height/12+height/3.5);
            text('Your freestyle time !',  width/3, height/8+height/3.5+height/12+height/3.5);
            pop();

        }
    }
    pop();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INSTRUCTION for INTERACTION

function instruction(){
    push();
    if(keyIsPressed && key == 'i'){
        // clear background elements
        clear();
        background(0);
        image(pic11, width/2, height/2);
    } 
    pop();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RESTART -- GO BACK TO INDEX PAGE

function reset(){
    push();
    if(keyCode == ESCAPE){
        addElements();
    }
    pop();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MOUSE OPERATIONS

function mousePressed(){
    if(start == false){
        if(mouseX>=width/5*4-width/30 && mouseX<=width/5*4+width/40 && 
            mouseY>= height/2+width/30 && mouseY<= height/2+width/15){
            introduction();
        }else{
            chooseMusic = true;
            start = true;
        }

    }else{
        if(chooseMusic == true && chooseStyle == false && showTransition == false && showStyle == false){
            if(mouseX>= width/6 && mouseX<= width/6+width/13){
                musicChosen1 = true; musicChosen2 = false; musicChosen3 = false; musicChosen4 = false;  musicChosen5 = false;
                if(mouseY>=height/2-width/25 && mouseY<=height/2+width/25){
                    music1.play();
                    music2.stop();
                    music3.stop(); 
                    music4.stop(); 
                    music5.stop(); 
                }
            }
            if(mouseX>= width/6*2-width/25 && mouseX<= width/6*2+width/25){
                musicChosen2 = true; musicChosen1 = false; musicChosen3 = false; musicChosen4 = false;  musicChosen5 = false;
                if(mouseY>= height/2-width/25 && mouseY<= height/2+width/25){
                    music2.play();
                    music1.stop();
                    music3.stop();
                    music4.stop(); 
                    music5.stop(); 
                }
            }
            if(mouseX>= width/2-width/25 && mouseX<= width/2+width/25){
                musicChosen3 = true; musicChosen2 = false; musicChosen1 = false; musicChosen4 = false;  musicChosen5 = false;
                if(mouseY>= height/2-width/25 && mouseY<= height/2+width/25){
                    music3.play();
                    music1.stop();
                    music2.stop();
                    music4.stop(); 
                    music5.stop(); 
                }
            }
            if(mouseX>= width/6*4-width/25 && mouseX<= width/6*4+width/25){
                musicChosen4 = true; musicChosen2 = false; musicChosen1 = false; musicChosen3 = false;  musicChosen5 = false;
                if(mouseY>= height/2-width/25 && mouseY<= height/2+width/25){
                    music4.play();
                    music1.stop();
                    music2.stop();
                    music3.stop(); 
                    music5.stop(); 
                }
            }
            if(mouseX>= width/6*5-width/25 && mouseX<= width/6*5+width/25){
                musicChosen5 = true; musicChosen2 = false; musicChosen1 = false; musicChosen4 = false;  musicChosen3 = false;
                if(mouseY>= height/2-width/25 && mouseY<= height/2+width/25){
                    music5.play();
                    music1.stop();
                    music2.stop();
                    music4.stop(); 
                    music3.stop(); 
                }
            }
        }

        if(chooseStyle == true && chooseMusic == false && showTransition == false  && showStyle == false){
            if(mouseX>=width/4-width/16 && mouseX<=width/4+width/16){
                styleChosen1 = true; styleChosen2 = false; styleChosen3 = false;
                if (mouseX>=width/4-width/100 && mouseX<=width/4+width/100 && mouseY>=height/2+height/20-width/100 && mouseY<= height/2+height/20+width/100){
                    playing1 = true; 
                    playing2 == false; 
                    palying3 == false;
                }
            }   
            if(mouseX>=width/2-width/16 && mouseX<=width/2+width/16){
                styleChosen2 = true; styleChosen1 = false; styleChosen3 = false;
                if(mouseX>=width/2-width/100 && mouseX<=width/2+width/100 && mouseY>=height/2+height/20-width/100 && mouseY<= height/2+height/20+width/100){
                    playing2 = true; 
                    playing1 == false;
                    palying3 == false;
                }
            }  
            if(mouseX>=width/4*3-width/16 && mouseX<=width/4*3+width/16){
                styleChosen3 = true; styleChosen2 = false; styleChosen1 = false;
                if(mouseX>=width/4*3-width/100 && mouseX<=width/4*3+width/100 && mouseY>=height/2+height/20-width/100 && mouseY<= height/2+height/20+width/100){
                    playing3 = true; 
                    playing1 == false; 
                    palying2 == false;
                }
            }

        }    
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// KEY OPERATIONS

function keyTyped(){
    
    if(showStyle == true){
        // drum beats instructions
        if(key == 'q'){
            drum1.play();
            drum1.setVolume(0.5);
        }
        if(key == 'w'){
            drum2.play();
            drum2.setVolume(0.5);
        }
        if(key == 'e'){
            drum3.play();
            drum3.setVolume(0.5);
        }
        if(key == 'r'){
            drum4.play();
            drum4.setVolume(0.5);
        }
        if(key == 't'){
            drum5.play();
            drum5.setVolume(0.5);
        }
        if(key == 'y'){
            drum6.play();
            drum6.setVolume(0.3);
        }
        if(key == 'm'){
            selectedMusic.play();
        }
        if(keyIsPressed && key == 'i'){
            instruction();  
        }
        // 
        if(key == '1'){
            music1.play();
            music2.stop();
            music3.stop();
            music4.stop();
            music5.stop();
        }
        if(key == '2'){
            music2.play();
            music1.stop();
            music3.stop();
            music4.stop();
            music5.stop();
        }
        if(key == '3'){
            music3.play();
            music2.stop();
            music1.stop();
            music4.stop();
            music5.stop();
        }
        if(key == '4'){
            music4.play();
            music2.stop();
            music3.stop();
            music1.stop();
            music5.stop();
        }
        if(key == '5'){
            music5.play();
            music2.stop();
            music3.stop();
            music4.stop();
            music1.stop();
        }
        if(key == 'p'){
            music1.pause();
            music2.pause();
            music3.pause();
            music4.pause();
            music5.pause();
        }

        if (key == ' ') {
            saveCanvas("thumbnail.png");
        }
    }else{

        if (key == ' ') {
            saveCanvas("thumbnail.png");
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FINISHED

