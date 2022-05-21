var blueContact = 0;
var redContact = 0;
var blueBullets = [];
var redBullets = [];
var bluelives = 10;
var redlives = 10;
var blueDirection = 'r';
var redDirection = 'l';
var mode = 'start';
var winner = '';
var initialChoice = '';

function setup(){
    createCanvas(1300, 600);
    playerBlue = createSprite(10, 10, 10, 10);
    playerBlue.shapeColor = 'blue';
    playerRed = createSprite(1290, 10, 10, 10);
    playerRed.shapeColor = 'red';
    worldBase = createSprite(650, 550, 1300, 10);
    worldBase.shapeColor = 'white';
}

function draw(){
    background('black');
    if(initialChoice == ''){
        textSize(50);
        fill('white');
        text('To use Manual Aiming Mode, press H', 200, 400);
        text('To use Auto Aiming Mode, press G', 225, 500);
    }
    else{
        modeChange();
    }
}

function modeChange(){
    if(mode == 'start'){
        blueContact = 0;
        redContact = 0;
        blueBullets = [];
        redBullets = [];
        bluelives = 10;
        redlives = 10;
        blueDirection = 'r';
        redDirection = 'l';
        winner = '';
        playerBlue.x = 10;
        playerBlue.y = 10;
        playerRed.x = 1290;
        playerRed.y = 10;
        mode = 'play';
    }
    else if(mode == 'play'){
        gravity();
        checkContact();
        relativeDirection();
        movement();
        updateBullets();
        decayBullets();
        drawSprites();
        livesCheck();
    }
    else if(mode == 'end'){
        textSize(200);
        fill(winner);
        text(winner + ' wins!', 200, 200);
        textSize(90);
        text('Press H to restart game!', 200, 400);
    }
}

function gravity(){
    playerBlue.velocityY += 5;
    playerRed.velocityY += 5;
}

function checkContact(){
    if(worldBase.y - playerBlue.y < 10){
        playerBlue.velocityY = 0;
        playerBlue.y = worldBase.y - 10;
        blueContact = 1;
    }
    if(worldBase.y - playerRed.y < 10){
        playerRed.velocityY = 0;
        playerRed.y = worldBase.y - 10;
        redContact = 1;
    }
}

function movement(){
    if(initialChoice == 'Manual'){

        // Blue Player Controls
        if(keyIsDown(65)){
            playerBlue.x -= 10;
            blueDirection = 'l';
        }
        if(keyIsDown(68)){
            playerBlue.x += 10;
            blueDirection = 'r';
        }
    
        // Red Player Controls
        if(keyIsDown(LEFT_ARROW)){
            playerRed.x -= 10;
            redDirection = 'l';
        }
        if(keyIsDown(RIGHT_ARROW)){
            playerRed.x += 10;
            redDirection = 'r';
        }
    }
    else if(initialChoice == 'Auto'){

        //Blue Player Controls
        if(keyIsDown(65)){
            playerBlue.x -= 10;
        }
        if(keyIsDown(68)){
            playerBlue.x += 10;
        }
    
        // Red Player Controls
        if(keyIsDown(LEFT_ARROW)){
            playerRed.x -= 10;
        }
        if(keyIsDown(RIGHT_ARROW)){
            playerRed.x += 10;
        }
    }
}

function updateBullets(){

    // Blue bullets
    for(let i = 0; i < (blueBullets.length); i++) {
        blueBullets[i].display();
    }

    // Red bullets
    for(let i = 0; i < (redBullets.length); i++) {
        redBullets[i].display();
    }
}

function decayBullets(){
    for(let i = 0; i < (blueBullets.length); i++) {
        if((blueBullets[i].x > 1300) || (blueBullets[i].x < 0)){
        blueBullets.splice(blueBullets[i-1], 1);
        }
        else if((playerRed.x < playerBlue.x) && (blueBullets[i].y == playerRed.y) && (blueBullets[i].x <= playerRed.x)){
        redlives -= 1;
        blueBullets.splice(blueBullets[i-1], 1);
        }
        else if((playerRed.x > playerBlue.x) && (blueBullets[i].y == playerRed.y) && (blueBullets[i].x >= playerRed.x)){
        redlives -= 1;
        blueBullets.splice(blueBullets[i-1], 1);
        }
    }

    for(let i = 0; i < (redBullets.length); i++) {
        if((redBullets[i].x > 1300) || (redBullets[i].x < 0)){
        redBullets.splice(redBullets[i-1], 1);
        }
        else if((playerBlue.x < playerRed.x) && (redBullets[i].y == playerBlue.y) && (redBullets[i].x <= playerBlue.x)){
        bluelives -= 1;
        redBullets.splice(redBullets[i-1], 1);
        }
        else if((playerBlue.x > playerRed.x) && (redBullets[i].y == playerBlue.y) && (redBullets[i].x >= playerBlue.x)){
        bluelives -= 1;
        redBullets.splice(redBullets[i-1], 1);
        }
    }
}
  
function livesCheck(){
    if(bluelives <= 0){
      winner = 'Red';
      mode = 'end';
    }
    if(redlives <= 0){
      winner = 'Blue';
      mode = 'end';
    }
}

function relativeDirection(){   
    if(initialChoice == 'Auto'){
        if(playerBlue.x < playerRed.x){
            blueDirection = 'r';
            redDirection = 'l';
          }
        else{
            blueDirection = 'l';
            redDirection = 'r';
        }
    }
    
}

function keyPressed(){

    // Code for main menu mode choice (manual or auto)
    if(initialChoice == ''){ // Makes sure that the choice has not already been made.

        // Check if key pressed is G.
        if(keyCode == 71){

            // Changes value of choice variable to 'Auto'.
            initialChoice = 'Auto';
        }

        // Checks if key pressed is H.
        else if (keyCode == 72){

            // Changes value of choice variable to 'Manual'.
            initialChoice = 'Manual';
        }
    }

    // Code for jump action in blue player.
    if(keyCode == 87 && blueContact == 1){ // Checks if blue player is on the ground and W has been pressed.

        // Sets instantaneous velocity to Blue Player to a high value.
        playerBlue.velocityY -= 50;

        // Changes value of contact variable.
        blueContact = 0;
    }

    // Code for shoot action in blue player.
    if(keyCode == 32){ // Checks of SPACE has been pressed.

        // Creates a new bullet object. (Classes.js)
        let newbluebullet = new blueBullet();

        // Appends object to object array.
        let appendblue = append(blueBullets, newbluebullet);
    }

    // Code for jump action in red player.
    if(keyCode == 38 && redContact == 1){ // Checks if red player is touching the ground and UP_ARROW has been pressed.

        // Sets instantaneous velocity to Blue Player to a high value.
        playerRed.velocityY -= 50;

        // Changes value of contact variable.
        redContact = 0;
    }

    // Code for shoot action in red player.
    if(keyCode == 13){ // Checks if ENTER has been pressed.

        // Creates a new bullet object. (Classes.js)
        let newredbullet = new redBullet();

        // Appends object to object array.
        let appendred = append(redBullets, newredbullet);
    }

    // Code for resetting game.
    if(keyCode == 72 && mode == 'end'){ // Checks if game has ended and H is pressed.

        // Resets game to 'start' mode.
        mode = 'start';
    }
}